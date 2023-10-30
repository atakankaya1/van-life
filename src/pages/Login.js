import React, { useEffect, useState} from "react"
import {
    useSearchParams,
    useNavigate,redirect, json
    
} from "react-router-dom"
import { login } from "../store/index"
import { useDispatch, useSelector } from "react-redux"


export default function Login() {
    
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    const [queryParameters] = useSearchParams()

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
           
        } catch (err) {
            console.log("err: ", err.message) 
            
        }
    }

    useEffect(() => {
        if (loggedIn) {
            navigate("/host")
            localStorage.setItem("user", JSON.stringify({name: name, id:id, loggedIn:true}))
        } else {
            navigate("/login")
        }
    }, [loggedIn, error]);

    console.log(error)

    
   // refreshten sonrası..

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            
            {error !== null && <h3 className="red">{error}</h3>}
            {queryParameters && <h3 className="red">{queryParameters.get("message")}</h3>} 

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
