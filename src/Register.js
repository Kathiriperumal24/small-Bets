import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { supabase } from "./supabaseClient"; // Supabase client setup

function Register() {
  const [formData, setFormData] = useState({
    fname: "",
    lastname: "",
    email: "",
    contact: "",
    dept: "",
    year: "",
    password: ""
  });

  const [message, setMessage] = useState(""); // State for displaying messages
  const navigate = useNavigate(); // useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Register the user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          fname: formData.fname,
          lastname: formData.lastname,
          contact: formData.contact,
          dept: formData.dept,
          year: formData.year
        }
      }
    });

    if (error) {
      alert(error.message);
    } else {
      console.log("Signup data", data);
      setMessage("Check your email to login!"); // Success message

      // Navigate to the login page after registration is successful
      setTimeout(() => {
        navigate("/login");
      }, 1500); // Delay the navigation to let the user see the success message
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && <p className="success-message">{message}</p>} {/* Show success message */}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fname"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dept"
          placeholder="Department"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year of Passing"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
