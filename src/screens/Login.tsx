import axios from "axios";
import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errr, setErrr] = useState(false);
  const [btnText, setBtnText] = useState("LOGIN");

  const [userDetails, setUserDetails] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //ensure user has filled
    if (!userDetails.username || !userDetails.password) {
      console.log("Fill in the form");
      return;
    }

    //check on the value of btnText
    if (btnText === "LOGIN") {
      const { data } = await axios.post("http://localhost:4000/auth/login", {
        ...userDetails,
      });
      
      console.log(data)
    }

    if (btnText === "REGISTER") {
      const { data } = await axios.post("http://localhost:4000/auth/register", {
        ...userDetails,
      });

      console.log(data)
    }

    // update status: Online or Offline
    const res = await axios.post("http://localhost:4000/users/status", {
      username: userDetails.username,
      status: "Online",
    });

    //store the user login details in local storage after successful login
    localStorage.setItem("user", JSON.stringify(userDetails));
    navigate("/users");
  };

  const handleLoginRegisterLink = () => {
    btnText === "LOGIN" ? setBtnText("REGISTER") : setBtnText("LOGIN");
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            name="username"
            value={userDetails.username}
            id="username"
            placeholder="Enter your username"
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={userDetails.password}
            id="password"
            placeholder="Enter your password"
            onChange={handleInputChange}
          />
          <input type="submit" value={btnText} />
        </form>
        <div className="footer">
          {btnText === "LOGIN" ? (
            <p>Don't have an account?</p>
          ) : (
            <p>Already have an account?</p>
          )}
          <span onClick={handleLoginRegisterLink}>
            {btnText === "LOGIN" ? "Register" : "Login"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
