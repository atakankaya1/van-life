import { requireAuth } from "../../utils"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addVan } from "../../store"
import { nanoid } from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"


export async function loader() {
    await requireAuth()
    return null
}

export default function AddVan() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id} = useSelector((state)=>{
    return state.user
    })
  const [vanData, setVanData] = useState({
    id: nanoid(),
    name: "",
    price: 0,
    description: "Comfortable van with many utilities!",
    imageUrl: "https://picsum.photos/200/300" ,
    type: "",
    hostId: id 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVanData({ ...vanData, [name]: value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addVan(vanData))
    navigate("/host")
    setVanData({
      id: nanoid(),
      name: "",
      price: 0,
      description: "",
      imageUrl: "",
      type: "",
      hostId: ""
    });
  };

  //addvan'den sonra redirect

  return (
    <div>
      <h2 className="addVan-header">Add Van</h2>
      <div className="addVan-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={vanData.name} onChange={handleInputChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={vanData.price} onChange={handleInputChange} min="0" />
        </label>
        <label>
          Description:
          <textarea 
          name="description" 
          value={vanData.description} 
          onChange={handleInputChange}
          placeholder="Comfortable van with many utilities!" />
        </label>
        <label>
          Image URL:
          <input type="text" 
          name="imageUrl" 
          value={vanData.imageUrl} 
          onChange={handleInputChange}
          placeholder="https://picsum.photos/200/300" />
        </label>
        <label>
          Type:
          <select  name="type" value={vanData.type} onChange={handleInputChange} >
            <option value="">Select a Type</option>
            <option value="simple">simple</option>
            <option value="rugged">rugged</option>
            <option value="luxury">luxury</option>
          </select>
        </label>
        <button type="submit">Add Van</button>
      </form>
      </div>
    </div>
  );
}