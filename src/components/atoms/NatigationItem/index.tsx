import React, { FC, ReactNode } from "react";
import classes from "./index.module.css";
import Link from "next/link";

type NavigationItemProps = {
  link: string;
  active?: boolean;
  children: ReactNode;
};

const NavigationItem: FC<NavigationItemProps> = ({
  link,
  active,
  children,
}) => {
  return (
    <li className={classes.navigationItem}>
      <Link href={link} className={active ? classes.active : ""}>
        {children}
      </Link>
    </li>
  );
};

export default NavigationItem;
