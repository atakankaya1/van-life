import { redirect } from "react-router-dom"


export async function requireAuth() {
    
    const logged = localStorage.getItem("logg")

    if (!logged) {
        const response = redirect(`/login?message=You must log in first.`)
        response.body = true 
        throw response
    }
}


