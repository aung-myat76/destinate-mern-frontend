import React from "react";
import { Link } from "react-router-dom";

const Button = ({
    children,
    to,
    href,
    variant = "primary", // "primary", "secondary", "outline"
    size = "md", // "sm", "md", "lg"
    rounded = "md", // "sm", "md", "lg", "xl", "full"
    addClass = "", // extra classes from parent
    disabled = false,
    ...otherProps
}) => {
    const baseStyle = "font-semibold focus:outline-none transition-all";

    const sizeStyles = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
    };

    const variantStyles = {
        primary: "bg-stone-900 text-white hover:bg-stone-700",
        secondary: "bg-stone-300 text-stone-800 hover:bg-stone-400",
        danger: "bg-red-300 text-stone-800 hover:bg-danger-400",
        orange: "bg-orange-300 text-stone-800 hover:bg-orange-400",
        info: "bg-blue-300 text-stone-800 hover:bg-blue-400",
        create: "bg-green-300 text-stone-800 hover:bg-green-400",
        login: "bg-blue-300 text-stone-800 hover:bg-blue-400",
        signup: "bg-green-300 text-stone-800 hover:bg-green-400",
        outline: "border border-stone-800 text-stone-800 hover:bg-stone-100",
    };

    const roundedStyles = {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
    };

    const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

    const btnClass = `
    ${baseStyle} 
    ${sizeStyles[size]} 
    ${variantStyles[variant]} 
    ${roundedStyles[rounded]} 
    ${disabledStyle} 
    ${addClass}
  `;

    if (to) {
        return (
            <Link className={btnClass} to={to} {...otherProps}>
                {children}
            </Link>
        );
    } else if (href) {
        return (
            <a className={btnClass} href={href} {...otherProps}>
                {children}
            </a>
        );
    } else {
        return (
            <button className={btnClass} disabled={disabled} {...otherProps}>
                {children}
            </button>
        );
    }
};

export default Button;
