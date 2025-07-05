import React from "react";
import ReactDOM from "react-dom";

const Overlay = ({ onClose }) => {
    return ReactDOM.createPortal(
        <div
            className="fixed cursor-pointer inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
        ></div>,
        document.getElementById("overlay-root")
    );
};

export default Overlay;
