import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-start md:items-center pt-5 text-[hsl(302,20%,30%)]">
      <div className="drop-shadow-clay w-full m-1 sm:m-0 sm:w-2/3">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-content-center gap-4 p-[20px] sm:p-[40px] rounded-[20px] sm:rounded-[40px] bg-white shadow-clay-card">
          <h2 className="col-span-1 sm:col-span-2">Register Here</h2>
          <Input placeholder="Enter username" type="text" />
          <Input placeholder="Enter firstname" type="text" />
          <Input placeholder="Enter lastname" type="text" />
          <Input placeholder="Enter email" type="email" />
          <Input placeholder="Enter password" type="password" />
          <Input placeholder="Confirm password" type="password" />
          <div className="form-control w-full col-span-2">
            <label className="label">
              <span className="label-text">Profile Picture</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>
          <Button
            label="Create Account"
            styles="col-span-1 sm:col-span-2 w-full"
          />
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
  );
};

export default Register;
