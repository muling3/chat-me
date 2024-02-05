import { ButtonProps } from '@/types';
import React, { FC } from 'react'

const Button: FC<ButtonProps> = ({ label, styles }) => {
  return (
    <button className={`btn outline-none border-none py-4 grid place-content-center rounded-lg in-flex shadow-clay-btn text-gray-500 tracking-wider ${styles ? styles : ''}`}>
      {label}
    </button>
  );
}

export default Button