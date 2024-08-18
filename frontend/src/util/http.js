import { QueryClient } from "@tanstack/react-query";
import { json } from "react-router-dom";
import { saveAuthToken } from "./util";

export const queryClient = new QueryClient();

export async function fetchProperties({ signal, address, type, query, pageParam }) {
    if (!pageParam) {
        pageParam = 1
    }
    let url = 'http://127.0.0.1:8000/api/properties/'
    console.log(query)
    if (query) {
        url += '?latest=true'
    } else if (address && type) {
        const addres = address.split(',')[0];
        url += `?city=${addres}&type=${type}&page=${pageParam}`
    } else if (address) {
        const addres = address.split(',')[0];
        url += `?city=${addres}&page=${pageParam}`
    } else if (type) {
        url += `?type=${type}&page=${pageParam}`
    } else {
        url += `?page=${pageParam}`
    }
    const response = await fetch(url, { signal: signal })
    const data = await response.json();
    if (!response.ok) {
        throw json({ message: 'Could not fetch details for selected event' }, { status: 500 })
    } else {
        return data
    }
}

export async function fetchPropertyDetails({ signal, slug }) {

    const response = await fetch('http://127.0.0.1:8000/api/properties/' + slug, { signal: signal })
    const data = await response.json();
    if (!response.ok) {
        throw json({ message: 'Could not fetch details for selected event' }, { status: 500 })
    } else {

        return data
    }
}
export async function fetchAgentDetails({ signal, username }) {
    const response = await fetch('http://127.0.0.1:8000/api/users/' + username)
    const data = await response.json();
    if (!response.ok) {
        throw json({ message: 'Could not fetch agent details' }, { status: 500 })
    } else {
        console.log(data)
        return data
    }
}

export async function refreshToken({ signal }) {
    const authData = {
        refresh: localStorage.getItem('refresh_token')
    }
    const response = await fetch('http://127.0.0.1:8000/api/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    })
    if (response.status !== 200) {
        return response
    }
    if (!response.ok) {
        throw json({ message: 'Login error' }, { status: 500 })
    }
    const data = await response.json();
    saveAuthToken(data.access)
    // console.log(data.access)
    return data
}