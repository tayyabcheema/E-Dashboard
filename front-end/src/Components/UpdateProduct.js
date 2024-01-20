import React, { useEffect } from 'react'
import { useState } from 'react';
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const[name,setName]= useState("")
    const[price,setPrice]= useState("")
    const[category,setCategory]= useState("")
    const[brand,setBrand]= useState("")
    const params= useParams();
    const navigate= useNavigate();

    useEffect(()=>{
      getProductDetails();
    },[]);

    const getProductDetails=async()=>{
      const url= `http://localhost:5000/api/product/${params.id}`;
      let response= await fetch(url);
      response= await response.json();
      setName(response.name)
      setPrice(response.price)
      setCategory(response.category)
      setBrand(response.brand)
    }

    const updateProduct= async()=>{
        const url=`http://localhost:5000/api/product/${params.id}`;
        let result= await fetch(url,{
          method: "put",
          body: JSON.stringify({name,price,category,brand}),
          headers:{
            'content-Type': 'application/json'
          }
        });
        result= await result.json();
        navigate("/")
    }

  return (
    <div className='product'>
        <h1>Update Product</h1>
      <input className='inputBox' type="text" placeholder='Enter product name' value={name} onChange={(e)=>{setName(e.target.value)}} />
      <input className='inputBox' type="number" placeholder='Enter product price' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
      <input className='inputBox' type="text" placeholder='Enter product category' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
      <input className='inputBox' type="text" placeholder='Enter product brand' value={brand} onChange={(e)=>{setBrand(e.target.value)}} />
      <button className='appButton' onClick={()=>{updateProduct()}}>Update Product</button>
    </div>
  )
}

export default UpdateProduct;
