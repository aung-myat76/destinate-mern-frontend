import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";

const Drawer = ({ onClose }) => {
    return ReactDOM.createPortal(
        <div className="w-10/12 h-screen center  bg-stone-900 text-white fixed top-0 right-0 z-50">
            <Navigation onClose={onClose} />
        </div>,
        document.getElementById("drawer-root")
    );
};

export default Drawer;
