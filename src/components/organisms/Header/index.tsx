import React, { FC } from "react";
import Logo from "@/components/atoms/Logo";
import classes from "./index.module.css";
import DrawerToggle from "@/components/molecules/DrawerToggle";
import NavigationItems from "@/components/molecules/NavigationItems";

type HeaderProps = {
  drawerToggleClicked: () => void;
};

const Header: FC<HeaderProps> = ({ drawerToggleClicked }) => {
  return (
    <header className={classes.header}>
      <DrawerToggle onClick={drawerToggleClicked} />
      <div className={classes.logo}>
        <Logo height={40} />
      </div>
      <nav className={classes.desktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Header;
