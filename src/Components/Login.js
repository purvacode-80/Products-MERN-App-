import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/users/login", user)
      .then((response) => {
        const token = response.data.token; // Extract token from response
        console.log("Token : ", token); // Print token in console
        localStorage.setItem("token", token); // Store token in localStorage
        alert("Login Successful...!"); // Only shows on success
      })
      .catch((err) => {
        console.error("Invalid Credentials:", err);
        alert("Invalid Credentials"); // Only shows on failure
      });
  };

  return (
    <div className="login">
      <div className='login-container form-container my-5'>
        <h3> Login </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Enter your email" />
          <Form.Control type="password" name="password" value={user.password} onChange={handleChange} id="inputPassword5" required placeholder="Enter Password" />
          <center> <button type="submit"> Login </button> </center>
        </Form>
        <h6> Don't have an account? <a href="/register"> Register </a> </h6>
      </div>
    </div>
  );
}

export default Login;