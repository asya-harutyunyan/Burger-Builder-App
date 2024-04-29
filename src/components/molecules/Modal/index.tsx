import React, { FC, ReactNode } from "react";
import Backdrop from "../Backdrop";
import classes from "./index.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && <Backdrop onClick={onClose} />}
      <div
        className={classes.modal}
        style={{ transform: isOpen ? "translateY(0" : "translateY(-100vh" }}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
