"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spacer from "@/components/Spacer";

const Register = () => {
  const API_URL = process.env.API_URL || "http://localhost:4000";
  const router = useRouter();

  const [userDetails, setUserDetails] = useState<{
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    confirmPassword: string;
    password: string;
  }>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    confirmPassword: "",
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

    // check if passwords match
    if (userDetails.password != userDetails.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    console.log("userDEtails", userDetails);

    //check on the value of btnText
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/register`,
        userDetails
      );

      console.log(data);
    } catch (error) {
      console.log("error occurred ", error);
      return;
    }

    // navigate to home page
    router.push("/login");
  };

  return (
    <div className="w-screen h-screen pt-5 text-[hsl(302,20%,30%)] flex flex-col justify-between">
      <div>
        <div className="logo text-start m-8">
          <span className="font-extrabold text-blue-400 text-3xl">Chat</span>
          <span className="text-gray-500 font-bold text-xl">Me</span>
        </div>
        <div className="flex justify-center items-center flex-wrap md:items-center drop-shadow-clay w-full m-1 sm:m-0">
          <div className="drop-shadow-clay w-full m-1 sm:m-0 sm:w-2/3">
            <div className="w-full p-[20px] sm:p-[40px] rounded-[20px] sm:rounded-[40px] bg-white shadow-clay-card">
              <h2 className="col-span-1 sm:col-span-2">Register Here</h2>
              <Spacer />
              <form
                onSubmit={formSubmitHandler}
                // className="w-full grid grid-cols-1 sm:grid-cols-2 place-content-center gap-4"
                className="flex justify-start items-start flex-wrap gap-2 w-full"
              >
                <div className="min-w-[100%] sm:min-w-[45%]">
                  <Input
                    placeholder="Enter username"
                    type="text"
                    name="username"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="min-w-[100%] sm:min-w-[45%]">
                  <Input
                    placeholder="Enter firstname"
                    type="text"
                    name="firstname"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="min-w-[100%] sm:min-w-[45%]">
                  <Input
                    placeholder="Enter lastname"
                    type="text"
                    name="lastname"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="min-w-[100%] sm:min-w-[45%]">
                  <Input
                    placeholder="Enter email"
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="min-w-[100%] sm:min-w-[45%]">
                  <Input
                    placeholder="Enter password"
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="min-w-[100%] sm:min-w-[45%]">
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    name="confirmPassword"
                    onChange={handleInputChange}
                  />{" "}
                </div>
                <div className="form-control w-full col-span-2">
                  <label className="label">
                    <span className="label-text">Profile Picture</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                  />
                </div>
                <Spacer />
                <Button
                  label="Create Account"
                  styles="col-span-1 sm:col-span-2 w-full"
                  type="submit"
                />
              </form>

              <Spacer />
              <div className="capitalize col-span-1 sm:col-span-2">
                already have an account?{" "}
                <Link
                  className="underline text-blue-400 font-semibold"
                  href={"/login"}
                >
                  login here
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

export default Register;
