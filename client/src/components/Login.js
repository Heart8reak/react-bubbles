import React, { useState } from "react";
import axiosWithAuth from '../auth/axiosWithAuth'

const Login = (props) => {
  // make a post request to retrieve a token from the api

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    axiosWithAuth()
      .post('/login', form)
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles')
      })
      .catch((err) => console.log('Login Error', err))
  }
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br />
        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
