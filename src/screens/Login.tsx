import React, { FormEvent, ChangeEvent, useState } from "react";
import {useNavigate } from "react-router-dom";

//socket io client
import { io } from "socket.io-client";

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState<{username: string, password: string}>({
    username: "",
    password: ""
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginDetails(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //ensure user has filled
    if(!loginDetails.username || !loginDetails.password){
      console.log("Fill in the form")
      return;
    }

    // TODO: Save the user in db if he doesnt exist

    //store the user login details in local storage
    // localStorage.setItem("user", JSON.stringify(loginDetails))

    navigate("/users");
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            name="username"
            value={loginDetails.username}
            id="username"
            placeholder="Enter your username"
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={loginDetails.password}
            id="password"
            placeholder="Enter your password"
            onChange={handleInputChange}
          />
          <input type="submit" value="LOGIN" />
        </form>
      </div>
    </>
  );
};

export default Login;
