import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  let navigate = useNavigate();
  async function handleSubmit(evt) {
    evt.preventDefault();
    const token = await login(formData);
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
        <label htmlFor="password">Password</label>
        <input name="password" type="password" autoComplete="on"></input>
        <button>Login</button>
      </form>
    </>
  );
}

export default LoginForm;
