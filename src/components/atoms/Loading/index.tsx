import React, { FC } from "react";
import classes from "./index.module.css";

type LoadingProps = {};

const Loading: FC<LoadingProps> = () => {
  return <div className={classes.loading}>Loading...</div>;
};

export default Loading;
