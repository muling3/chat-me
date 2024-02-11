import { InputProps } from "@/types";
import React, { FC } from "react";

const Input: FC<InputProps> = ({
  type,
  name,
  placeholder,
  styles,
  onChange,
}) => {
  return (
    <input
      id={name}
      name={name}
      className={`w-full p-3 outline-none rounded-lg shadow-clay-card ${
        styles ? styles : ""
      }`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  );
};

export default Input;
