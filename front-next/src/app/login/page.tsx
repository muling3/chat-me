"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import axios from "axios";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const API_URL = process.env.API_URL || "http://localhost:4000";
  const [errr, setErrr] = useState(false);
  const router = useRouter();

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

    console.log("userDEtails", userDetails);

    //check on the value of btnText
    try {
      const { data, status } = await axios.post(
        `${API_URL}/auth/login`,
        userDetails
      );
      console.log("backedn status", status);

      console.log(data);
    } catch (error) {
      console.log(" errro  occurred ", error);
      return;
    }

    //store the user login details in local storage after successful login
    localStorage.setItem("user", JSON.stringify(userDetails));

    // navigate to home page
    router.push("/");
  };

  return (
    <div className="w-screen h-screen pt-5 text-[hsl(302,20%,30%)] flex flex-col justify-between">
      <div>
        <div className="logo text-start m-8">
          <span className="font-extrabold text-blue-400 text-3xl">Chat</span>
          <span className="text-gray-500 font-bold text-xl">Me</span>
        </div>
        <div className="flex justify-center items-start md:items-center">
          <div className="drop-shadow-clay w-full m-1 sm:m-0 sm:w-1/3">
            <div className="w-full flex items-start gap-4 flex-col p-[20px] sm:p-[40px] rounded-[20px] sm:rounded-[40px] bg-white shadow-clay-card">
              <h2>Login Here</h2>
              <form
                onSubmit={formSubmitHandler}
                className="w-full flex justify-between flex-col items-start"
              >
                <Input
                  placeholder="Enter username or email"
                  type="text"
                  name={"username"}
                  onChange={handleInputChange}
                />
                <Spacer />
                <Input
                  placeholder="Enter password"
                  type="password"
                  name={"password"}
                  onChange={handleInputChange}
                />
                <div className="form-control w-full">
                  <label className="label cursor-pointer w-full">
                    <span className="label-text text-[hsl(302,20%,30%)]">
                      Remember me
                    </span>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </div>
                <Button type="submit" label="Login" styles="w-full" />
              </form>

              <div className="capitalize">
                don't have an account?{" "}
                <Link
                  className="underline text-blue-400 font-semibold"
                  href={"/register"}
                >
                  register here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer w-full flex justify-center items-start md:items-center mb-2">
        <small>
          Built by Alexander Muli / +254702051060 / alexandermuli234@gmail.com
          &copy; 2024
        </small>
      </div>
    </div>
  );
};

export default Login;
