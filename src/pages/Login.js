import React, { useEffect, useState} from "react"
import {
    useLoaderData,
    Form,
    redirect,
    useActionData,
    useNavigate
} from "react-router-dom"
import { loginUser } from "../api"
import { login } from "../store/index"
import { useDispatch, useSelector } from "react-redux"


//Form u form yap, massage'ı logged in false ise ver, reject olursa da oradan mesaj geliyor zaten. redirect'i de history ile çözebilirsin belki!!

// host sayfasında loginden sonra yönlendirme yapma logic'i düzelt.


export default function Login() {
    
    const navigate = useNavigate()
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
         await dispatch(login({ email, password }))
         const response = navigate("/host")
         response.body = true
         return response
            
        } catch (err) {
            console.log(err.message) 
        }
    }

    console.log(error)
    if(loggedIn){
        localStorage.setItem("loggedin", true)
    }

   
    
    // {message && <h3 className="red">{message}</h3>}
    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            
            {error !== null && <h3 className="red">{error}</h3>}

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
                    {pen ? "Logging in..." : loggedIn ? "Logged In" : "Log in"
                    }
                </button>
            </form>
        </div>
    )
}
