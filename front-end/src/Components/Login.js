import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    const url = "http://localhost:5000/api/user/login";

    try {
      const response = await axios.post(url, { email, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        alert("Your username or password is incorrect");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="email"
        placeholder="Enter the email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Login
      </button>
    </div>
  );
};

export default Login;
