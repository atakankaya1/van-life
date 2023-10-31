import React, {useEffect} from "react"
import { Link, useLoaderData, defer, Await } from "react-router-dom"
import { requireAuth } from "../../utils"
import { useDispatch, useSelector } from "react-redux"
import { loadVans } from "../../store"

export async function loader({ request }) {
    await requireAuth(request)
    return null
}

export default function HostVans() {

    const dispatch = useDispatch()
    const {data} = useSelector((state)=>{
        return state.vans
    })
    const {id} = useSelector((state)=>{
        return state.user
    })
    

    const bak = data.filter((van) => van.hostId == id);
  
    
        const hostVansEls = bak.map(van => (
            <Link
                to={van.id}
                key={van.id}
                className="host-van-link-wrapper"
            >
                <div className="host-van-single" key={van.id}>
                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                    <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                </div>
            </Link>
        ))
       
    

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            
                <div className="host-vans-list">
                <section>
                    {hostVansEls}
                </section>
                <Link
                to="addVan">Add Van</Link>
            </div>
                
               
        </section>
    )
}