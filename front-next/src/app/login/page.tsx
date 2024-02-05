import Button from '@/components/Button';
import Input from '@/components/Input'
import Link from 'next/link';
import React from 'react'

const Login = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-start md:items-center text-[hsl(302,20%,30%)]">
      <div className="drop-shadow-clay w-full m-1 sm:m-0 sm:w-1/3">
        <div className="w-full flex items-start gap-4 flex-col p-[20px] sm:p-[40px] rounded-[20px] sm:rounded-[40px] bg-white shadow-clay-card">
          <h2>Login Here</h2>
          <Input placeholder="Enter username or email" type="text" />
          <Input placeholder="Enter password" type="password" />
          <div className="form-control w-full">
            <label className="label cursor-pointer w-full">
              <span className="label-text text-[hsl(302,20%,30%)]">
                Remember me
              </span>
              <input type="checkbox" className="checkbox" />
            </label>
          </div>
          <Button label="Login" styles="w-full" />
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
  );
}

export default Login