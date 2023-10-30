import { requireAuth } from "../../utils"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVan } from "../../store";
import { nanoid } from "@reduxjs/toolkit";


export async function loader({ request}) {
    await requireAuth(request)
    return null
}


export default function AddVan() {
  const dispatch = useDispatch();
  const {id} = useSelector((state)=>{
    return state.user
    })
  const [vanData, setVanData] = useState({
    id: nanoid(),
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
    type: "",
    hostId: id 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVanData({ ...vanData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addVan(vanData));
    setVanData({
      id: "",
      name: "",
      price: 0,
      description: "",
      imageUrl: "",
      type: "",
      hostId: ""
    });
  };

  return (
    <div>
      <h2>Add Van</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={vanData.name} onChange={handleInputChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={vanData.price} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={vanData.description} onChange={handleInputChange} />
        </label>
        <label>
          Image URL:
          <input type="text" name="imageUrl" value={vanData.imageUrl} onChange={handleInputChange} />
        </label>
        <label>
          Type:
          <input type="text" name="type" value={vanData.type} onChange={handleInputChange} />
        </label>
        <button type="submit">Add Van</button>
      </form>
    </div>
  );
}