import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const collectData = async () => {
    const url = "http://localhost:5000/api/user/register";

    try {
      const response = await axios.post(url, { name, email, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;
      console.log(result);

      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));

      if (result) {
        navigate("/login"); // Redirect to the login page
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register">
      <h1>Register Yourself</h1>

      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />

      <input
        className="inputBox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button className="appButton" onClick={collectData} type="button">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
