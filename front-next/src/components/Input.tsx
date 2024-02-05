import { InputProps } from "@/types";
import React, { FC } from "react";

const Input: FC<InputProps> = ({ type, placeholder, styles }) => {
  return (
    <input
      className={`w-full p-3 outline-none rounded-lg shadow-clay-card ${styles ? styles : ''}`}
      type={type}
      placeholder={placeholder}
      required
    />
  );
};

export default Input;
