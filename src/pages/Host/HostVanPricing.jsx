import React, {useState} from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import { changePrice } from "../../store"
import { useDispatch } from "react-redux"


export default function HostVanPricing() {
    const currentVan = useLoaderData()
    const navigate = useNavigate()

    console.log("pp: ",currentVan)
    const dispatch = useDispatch();

    const [newPrice, setNewPrice] = useState(currentVan.price);

    const handlePriceChange = (e) => {
        setNewPrice(e.target.value);
    };

    console.log("new: ",newPrice)
    console.log("new: ",currentVan.id)

    const handleSubmit = () => {
        const vanInfo = {id: currentVan.id, price: newPrice}
        dispatch(changePrice( vanInfo ));
        navigate("/host")
    };

    return (
        <div>
        <h3 className="host-van-price">${currentVan.price}<span>/day</span></h3>
        <form onSubmit={handleSubmit}>
            <label>
                Change Price:
                <input
                    type="number"
                    value={newPrice}
                    onChange={handlePriceChange}
                    min="0"
                />
            </label>
            <button type="submit">Update Price</button>
        </form>
    </div>
    )
}