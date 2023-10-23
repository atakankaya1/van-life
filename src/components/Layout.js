import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header.js"


export default function Layout() {
    return (
        <div className="site-wrapper">
            <Header />
            <main>
                <Outlet />
            </main>
            <footer> 2022 #VANLIFE</footer>
        </div>
    )
}