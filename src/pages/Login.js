import React, { useEffect, useState} from "react"
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData
} from "react-router-dom"
import { loginUser } from "../api"
import { login } from "../store/index"
import { useDispatch, useSelector } from "react-redux"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}


//Form u form yap, massage'ı logged in false ise ver, reject olursa da oradan mesaj geliyor zaten. redirect'i de history ile çözebilirsin belki!!

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/host"
    
    try {
        const data = await loginUser({ email, password })
        localStorage.setItem("loggedin", true)
        const response = redirect(pathname)
        response.body = true  
        return response
        
    } catch(err) {
        return err.message
    }
}

export default function Login() {
    const errorMessage = useActionData()
    console.log("error mmaa: ", errorMessage)
    const message = useLoaderData()
    const navigation = useNavigation()

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3 className="red">{message}</h3>}
            {errorMessage === "No user with those credentials found!" && <h3 className="red">{errorMessage}</h3>}

            <Form 
                method="post" 
                className="login-form" 
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </Form>
        </div>
    )
}
