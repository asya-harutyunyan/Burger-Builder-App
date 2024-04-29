import React, { FC } from "react";
import classes from "./index.module.css";
import NavigationItem from "@/components/atoms/NatigationItem";

type NavigationItemsProps = {};

const NavigationItems: FC<NavigationItemsProps> = () => {
  return (
    <ul className={classes.navigationItems}>
      <NavigationItem link="/orders">All orders</NavigationItem>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
