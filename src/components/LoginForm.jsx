import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { emailvalidate, passwordvalidate } from "./regexvalidate";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginRequest = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: input.email,
      password: input.password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("https://thestoryloft.in/api/login", requestOptions);
      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred during login");
    }
  };

  const Logincheck = (e) => {
    e.preventDefault();

    if (!emailvalidate(input.email)) {
      setErrorMessage("Please enter a valid username");
      return;
    }

    if (!passwordvalidate(input.password)) {
      setErrorMessage("Password should have a minimum of 6 characters");
      return;
    }

    loginRequest();
  };

  return (
    <div className="container">
      <form onSubmit={Logincheck}>
        <h1>LOG IN</h1>
        {errorMessage && (
          <div style={{ fontSize: "15px", marginLeft: "10px", color: "red" }}>
            {errorMessage}
          </div>
        )}
        <div className="input-box">
          <input
            type="text"
            name="email"
            placeholder="UserName"
            required
            onChange={handleChange}
          />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <RiLockPasswordFill className="icon" />
        </div>

        <div className="remember-me">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
        </div>
        <button type="submit">Login</button>
        <div className="link">
          <p>
            website <a href="https://storyloft.onrender.com/">storyloft</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;


