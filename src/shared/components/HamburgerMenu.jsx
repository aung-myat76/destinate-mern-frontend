import React from "react";

const HamburgerMenu = ({ onOpen }) => {
    return (
        <div className="cursor-pointer md:hidden" onClick={onOpen}>
            <div className="w-[20px] h-[3px] bg-stone-100 mb-1 rounded-md"></div>
            <div className="w-[20px] h-[3px] bg-stone-100 mb-1 rounded-md"></div>
            <div className="w-[20px] h-[3px] bg-stone-100 mb-1 rounded-md"></div>
        </div>
    );
};

export default HamburgerMenu;
