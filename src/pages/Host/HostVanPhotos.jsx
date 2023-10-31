import React from "react"
import { useLoaderData } from "react-router-dom"

export default function HostVanPhotos() {
    const currentVan = useLoaderData()
    return (
        <img src={currentVan.imageUrl} className="host-van-detail-image" />
    )
}