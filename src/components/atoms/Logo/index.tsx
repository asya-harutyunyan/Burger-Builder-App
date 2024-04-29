import React, { FC } from "react";
import classes from "./index.module.css";
import Image from "next/image";

type LogoProps = {
  height: number;
};

const Logo: FC<LogoProps> = ({ height }) => {
  return (
    <div className={classes.logo} style={{ height }}>
      <Image src="/burger-img.jpg" height={40} width={40} alt="logo" />
    </div>
  );
};

export default Logo;
