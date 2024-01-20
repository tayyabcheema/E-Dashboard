import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    //        console.log(name,price,category,brand,userId);

    if (!name || !price || !category || !brand) {
      setError(true);
      return false;
    }
    let token = JSON.parse(localStorage.getItem("token"));
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const url = "http://localhost:5000/api/product/add";
    let result = await fetch(url, {
      method: "post",
      body: JSON.stringify({ name, price, category, brand, userId }),
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    result = await result.json();
    //    console.log(result);
    // alert("Product is added successfully, Click OK to continue")
    navigate("/");
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Enter a valid name</span>
      )}
      <input
        className="inputBox"
        type="number"
        placeholder="Enter price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />{" "}
      {error && !price && (
        <span className="invalid-input">Enter a valid price</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />{" "}
      {error && !category && (
        <span className="invalid-input">Enter a valid category</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter product brand"
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      />{" "}
      {error && !brand && (
        <span className="invalid-input">Enter a valid brand</span>
      )}
      <button onClick={addProduct} className="appButton" type="button">
        Add Product
      </button>
    </div>
  );
};
export default AddProduct;
