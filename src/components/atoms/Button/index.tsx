import React, { FC, ReactNode } from "react";
import classes from "./index.module.css";

type ButtonProps = {
  btnType: string;
  onClick?: () => void;
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({ btnType, onClick = () => {}, children }) => {
  return (
    <button
      className={[classes.Button, classes[btnType]].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
