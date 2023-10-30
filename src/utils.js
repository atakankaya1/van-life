import { redirect } from "react-router-dom"

import {store} from './store/index';



export async function requireAuth(request) {
    
    const state = store.getState();
    const isLoggedIn = state.user.loggedIn
    console.log("kes",state.user.loggedIn)

    if (!isLoggedIn) {
        const response = redirect(`/login?message=You must log in first.`)
        response.body = true 
        throw response
    }
}


