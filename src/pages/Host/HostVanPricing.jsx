import React from "react"
import { useLoaderData } from "react-router-dom"

export default function HostVanPricing() {
    const currentVan = useLoaderData()
    return (
        <h3 className="host-van-price">${currentVan.price}<span>/day</span></h3>
    )
}