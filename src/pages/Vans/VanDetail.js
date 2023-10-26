import React, { useEffect } from "react"
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { loadVans } from "../../store/index"

export default function VanDetail() {
    const params = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadVans())
    }, [dispatch])

    const {isLoading, data, error} = useSelector((state)=>{
        return state.vans
    })



    const location = useLocation()
    const van = data.find((van) => van.id === params.id);;
    console.log(van)

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Check if there was an error loading the van
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Check if van is undefined
    if (!van) {
        return <div>Van not found</div>;
    }

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>

            <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>
                    {van.type}
                </i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>

        </div>
    )
}