import React from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"

import { logoutUser } from "../store/index"
import { useDispatch, useSelector } from "react-redux"


export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {loggedIn, name} = useSelector((state)=>{
        return state.user
    })

    const fakeLogOut = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("logg")
        dispatch(logoutUser())
        navigate("/login")
    }
    
    const localLogin = localStorage.getItem('loggedin');

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink 
                    to="host"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink 
                    to="about"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink 
                    to="vans"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
                {
                    (!localLogin || !loggedIn) ?
                    <Link to="host" className="login-link">
                        {name || "Login"}
                    </Link> :
                    <Link to="login" className="login-link">
                        Login
                    </Link>
                }
                
                {(loggedIn || localLogin) && <button className="logout" onClick={fakeLogOut}>Logout</button>}
                
            </nav>
        </header>
    )
}