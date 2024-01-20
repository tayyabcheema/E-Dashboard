import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []); // Fetch products when the component mounts

  const getProducts = async () => {
    const url = "http://localhost:5000/api/product/getProducts";

    try {
      const response = await axios.get(url, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });

      const products = response.data;
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error, perhaps setProducts([]) or show an error message
    }
  };

  const deleteProduct = async (id) => {
    const url = `http://localhost:5000/api/product/${id}`;
    const confirmed = window.confirm(
      "Are you sure you want to delete the product?"
    );

    if (confirmed) {
      try {
        await axios.delete(url);
        getProducts(); // Refresh the product list after successful deletion
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    key = key.toLowerCase() || key.toUpperCase();

    if (key) {
      const url = `http://localhost:5000/api/product/${key}`;
      try {
        const response = await axios.get(url);
        const result = response.data;

        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Products List</h1>
      <Link to="./add">
        <button className="add-btn">Add Product</button>
      </Link>
      <input
        className="search-product-box"
        type="text"
        placeholder="Search product here"
        onChange={searchHandle}
      />
      <ul>
        <li>
          <strong>Serial No</strong>
        </li>
        <li>
          <strong>Name</strong>
        </li>
        <li>
          <strong>Price</strong>
        </li>
        <li>
          <strong>Category</strong>
        </li>
        <li>
          <strong>Brand</strong>
        </li>
        <li>
          <strong>Operation</strong>
        </li>
      </ul>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>Rs. {item.price}</li>
            <li>{item.category}</li>
            <li>{item.brand}</li>
            <li>
              <button
                className="delbtn"
                onClick={() => deleteProduct(item._id)}
              >
                Delete
              </button>
              <Link to={`/update/${item._id}`}>
                <button className="upd-btn">Update</button>
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>
          <br /> No Result Found
        </h1>
      )}
    </div>
  );
};

export default ProductsList;
