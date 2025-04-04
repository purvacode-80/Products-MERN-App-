import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/users/register", user)
      .then(() => {
        alert("Registration Successful...!"); 
      })
      .catch((err) => {
        console.error("Error while registering user:", err); 
        alert("Error while registering user");
      });
  };

  return (
    <div className="register">
      <div className='register-container form-container my-5'>
        <h3> Register </h3>
        <Form onSubmit={handleSubmit}>
          <Form.Control type="text" name="firstName" value={user.firstName} onChange={handleChange} required placeholder="Enter your First Name" />
          <Form.Control type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Enter your Last Name" />
          <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required placeholder="Enter your Email" />
          <Form.Control type="date" name="birthDate" value={user.birthDate} onChange={handleChange} required />
          <Form.Control type="password" name="password" value={user.password} onChange={handleChange} id="inputPassword5" required placeholder="Enter Password" />
          <center> <button type="submit"> Register </button> </center>
        </Form>
        <h6> Already have an account? <a href="/login"> Login </a> </h6>
      </div>
    </div>
  );
}

export default Register;