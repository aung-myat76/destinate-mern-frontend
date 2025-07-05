import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, to, href, addClass = "", ...othersProps }) => {
    // const hoverColor = addClass.split("-")[1];
    // const hoverLevel = +addClass.split("-")[2] - 100;
    // console.log("hover", hoverLevel);
    const btnClass = `${addClass} p-3 m-1 rounded-md text-white bg-stone-900 font-bold  disabled:bg-stone-300 `;
    // console.log(addClass);
    if (to) {
        return (
            <Link className={btnClass} to={to} {...othersProps}>
                {children}
            </Link>
        );
    } else if (href) {
        <a className={btnClass} href={href} {...othersProps}>
            {children}
        </a>;
    } else {
        return (
            <button className={btnClass} {...othersProps}>
                {children}
            </button>
        );
    }
};

export default Button;
