import React from "react";

const Card = ({ children, addClass = "" }) => {
    return (
        <div
            className={`bg-stone-900 text-white my-3 min-w-[250px] rounded-xl shadow-lg mx-3   ${addClass} `}
        >
            {children}
        </div>
    );
};

export default Card;
