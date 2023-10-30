import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { requireAuth } from "../../utils"
import { useDispatch, useSelector } from "react-redux"
import { loadVans, loginedInUser } from "../../store/index"

export async function loader({ request}) {
    await requireAuth(request)
    return null
}

export default function Dashboard() {
    
    const dispatch = useDispatch()
    const localData = JSON.parse(localStorage.getItem("user"))
    const {data} = useSelector((state)=>{
        return state.vans
    })
    const {id} = useSelector((state)=>{
        return state.user
    })
    useEffect(() => {
        if(localData){
            dispatch(loginedInUser(localData))
            dispatch(loadVans())
        }
        
    }, [dispatch])

    const bak = data.filter((van) => van.hostId === id);
    console.log("bak:", data)
    console.log("id:", id)
    

    
        const hostVansEls = bak.map((van) => (
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
                <Link to={`vans/${van.id}`}>View</Link>
            </div>
        ))

    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome!</h1>
                    <p>This is your host page.</p>
                    
                </div>
                
            </section>
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                
            <div className="host-vans-list">
                <section>{hostVansEls}</section>
            </div>
                
            </section>
        </>
    )
}
