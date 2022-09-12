import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm({ register }) {
  let navigate = useNavigate();
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("formData", formData);
    const token = await register(formData);
    if (token) {
      navigate("/trip/select/from");
      setFormData({});
    }
  }
  const [formData, setFormData] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  return (
    <>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input name="username"></input>
        <label htmlFor="email">Email</label>
        <input name="email"></input>
        <label htmlFor="password">Password</label>
        <input name="password"></input>
        <label htmlFor="height">Height</label>
        <input name="height" type="text"></input>
        <label htmlFor="weight">Weight</label>
        <input name="weight" type="text"></input>
        <button>Register</button>
      </form>
    </>
  );
}

export default RegisterForm;
