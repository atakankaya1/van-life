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


//Form u form yap, massage'ı logged in false ise ver, reject olursa da oradan mesaj geliyor zaten. redirect'i de history ile çözebilirsin belki!!

// host sayfasında loginden sonra yönlendirme yapma logic'i düzelt.


export default function Login() {
    const errorMessage = useActionData()
    console.log("error mmaa: ", errorMessage)
    const message = useLoaderData()
    const navigation = useNavigation()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    const {isLoading,
        name,
        id,
        loggedIn,
        error,pen} = useSelector((state)=>{
        return state.user
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
         dispatch(login({ email, password }))
         const response = redirect("/host")
         response.body = true  
         return response
        } catch (err) {
            console.log(err.message) 
        }
    }
    console.log("log: ", loggedIn)
    if(loggedIn){
        localStorage.setItem("loggedin", true)
    }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3 className="red">{message}</h3>}
            {error === "No user with those credentials found!" && <h3 className="red">{error}</h3>}

            <form 
                method="post" 
                className="login-form" 
                onSubmit={handleSubmit}
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button
                    disabled={isLoading === true}
                >
                    {pen ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </form>
        </div>
    )
}
