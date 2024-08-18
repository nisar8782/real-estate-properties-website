import React from 'react'
import classes from './Login.module.css'
import { Form, json, redirect, useActionData, useNavigation } from 'react-router-dom'
import { saveAuthToken } from '../util/util'


export default function Login() {
    const data = useActionData()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <>
            <Form method='post' className={classes['form']}>
                <h3>Login Here</h3>
                <label htmlFor="username" className={classes.label}>Phone Number</label>
                <input type="text" placeholder="Enter username" id="username" name="username" className={classes.input} />

                <label htmlFor="password" className={classes.label}>Password</label>
                <input type="password" placeholder="Password" id="password" name="pass" className={classes.input} />

                <button type="submit" disabled={isSubmitting} className={classes.button}>{isSubmitting ? 'Submitting' : 'Login'}</button>
                {data && data.detail && <p className={classes.error}>Incorrect username or password</p>}

                {/* <Link to='/signup'>SignUp</Link> */}
                {/* <p>Create a account</p> */}
            </Form >

        </>

    )
}
export async function action({ request }) {
    const data = await request.formData();
    const authData = {
        username: data.get('username'),
        password: data.get('pass')
    }
    const response = await fetch('http://127.0.0.1:8000/api/api/token/', {
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
    const respData = await response.json()
    saveAuthToken(respData.access, respData.refresh)
    return redirect('/')
}