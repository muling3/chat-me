import React, { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate("/users");
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          <input type="submit" value="LOGIN" />
        </form>
      </div>
    </>
  );
};

export default Login;
