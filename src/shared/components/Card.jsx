import React from "react";

const Card = ({ children, addClass = "" }) => {
    return (
        <div
            className={`bg-stone-900 text-white p-3 my-3 min-w-[250px] rounded-sm shadow-sm   ${addClass} `}
        >
            {children}
        </div>
    );
};

export default Card;
