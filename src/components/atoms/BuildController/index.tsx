import React, { FC } from "react";
import classes from "./index.module.css";

type BuildControllerProps = {
  label: string;
  removed: any;
  added: any;
  disabled: boolean;
};

const BuildController: FC<BuildControllerProps> = ({
  label,
  removed,
  added,
  disabled,
}) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.Less} onClick={removed} disabled={disabled}>
        Less
      </button>
      <button className={classes.More} onClick={added}>
        More
      </button>
    </div>
  );
};

export default BuildController;
