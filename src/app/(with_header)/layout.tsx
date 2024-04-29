"use client";

import Header from "@/components/organisms/Header";
import { ReactNode, useCallback, useState } from "react";
import classes from "./layout.module.css";
import SideDrawer from "@/components/organisms/SideDrawer";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  const [showSideDrawer, setShowSideDrawer] = useState<boolean>(false);

  const sideDrawerClosedHandler = useCallback(() => {
    setShowSideDrawer(false);
  }, []);

  const sideDrawerToggleHandler = useCallback(() => {
    setShowSideDrawer((prevState) => !prevState);
  }, []);

  return (
    <div>
      <Header drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={showSideDrawer} onClose={sideDrawerClosedHandler} />
      <main className={classes.content}>{children}</main>
    </div>
  );
}
