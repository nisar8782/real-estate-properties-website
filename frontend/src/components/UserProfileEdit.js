import { Form, redirect, json, useNavigation } from "react-router-dom";
import classes from './UserProfileEdit.module.css'
import { fetchAgentDetails, refreshToken } from "../util/http";
import { useJwt } from "react-jwt";
import { useQuery } from "@tanstack/react-query";


export default function UserProfileEdit() {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    const { decodedToken, isExpired, reEvaluateToken } = useJwt(localStorage.getItem('access_token'));
    let username = null;
    if (decodedToken) {
        username = decodedToken.user_id
    }
    const { data: data1, isLoading: isLoading1, isError: isError1, error: error1 } = useQuery({
        queryKey: [username],
        queryFn: ({ signal }) => refreshToken({ signal }),
        enabled: isExpired,
    });
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [username],
        queryFn: ({ signal }) => fetchAgentDetails({ signal, username }),
        enabled: !isExpired && username !== null,
        refetchOnWindowFocus: false,
    });
    function HanleSaveChanges() {

    }
    return (
        <div className={classes['user-form-container']}>

            {data && <Form method="POST" className="row g-3">
                <div className="col-12">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" readOnly className="form-control" id="username" name="username" defaultValue={data.username} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="first-name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first-name" name="first_name" defaultValue={data.first_name} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="last-name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last-name" name="last_name" defaultValue={data.last_name} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" defaultValue={data.email} />
                </div>
                <div className="col-12">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" defaultValue={data.title} />
                </div>
                <div className="col-12">
                    <label htmlFor="about" className="form-label">About</label>
                    <textarea className="form-control" id="about" name="about" defaultValue={data.about} />
                </div>
                {isSubmitting ? <button disabled type="submit" className={classes['save-button']} onClick={HanleSaveChanges}>Submitting</button> : <button type="submit" className={classes['save-button']} onClick={HanleSaveChanges}>Save</button>}
            </Form>}
        </div>
    )
}

export async function action({ request }) {
    const data = await request.formData();
    console.log(data.get('username'))
    const username = data.get('username')
    const authData = {
        first_name: data.get('first_name'),
        last_name: data.get('last_name'),
        emai: data.get('email'),
        title: data.get('title'),
        about: data.get('about')
    }
    const response = await fetch('http://127.0.0.1:8000/api/users/' + username, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify(authData)
    })
    if (response.status !== 200) {
        return response
    }
    if (!response.ok) {
        throw json({ message: 'Login error' }, { status: 500 })
    }
    const respData = await response.json()
    // saveAuthToken(respData.access, respData.refresh)
    return redirect('/profile')
}
