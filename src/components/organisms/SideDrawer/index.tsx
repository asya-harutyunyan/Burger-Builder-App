import React, { FC, useMemo } from "react";
import classes from "./index.module.css";
import Backdrop from "@/components/molecules/Backdrop";
import Logo from "@/components/atoms/Logo";
import NavigationItems from "@/components/molecules/NavigationItems";

type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const SideDrawer: FC<SideDrawerProps> = ({ open, onClose }) => {
  const attachedClasses = useMemo(() => {
    if (open) {
      return [classes.sideDrawer, classes.open];
    }
    return [classes.sideDrawer, classes.close];
  }, [open]);

  return (
    <div>
      {open && <Backdrop onClick={onClose} />}
      <div className={attachedClasses.join(" ")}>
        <div className={classes.logo}>
          <Logo height={40} />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </div>
  );
};

export default SideDrawer;
