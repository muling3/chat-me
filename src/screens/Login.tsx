import axios from "axios";
import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errr, setErrr] = useState(false);

  const [loginDetails, setLoginDetails] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //ensure user has filled
    if (!loginDetails.username || !loginDetails.password) {
      console.log("Fill in the form");
      return;
    }

    //store the user login details in local storage after successful login
    const { data } = await axios.post("http://localhost:4000/auth/login", {
      ...loginDetails,
    });
    const res = await axios.post("http://localhost:4000/users/status", {
      username: loginDetails.username,
      status: "Online",
    });

    localStorage.setItem("user", JSON.stringify(loginDetails));
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
