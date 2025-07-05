import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { authContext } from "../context/auth-context";
import Button from "./Button";

const Navigation = ({ onClose }) => {
    const { isLoggined, logout, userId } = useContext(authContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        if (confirm("Do you really wanna logout?")) {
            logout();
            navigate("/account");
        }
    };

    const navLinkClass = "block p-2 my-5 hover:text-orange-400 md:mx-3 md:my-1";

    return (
        <nav>
            <ul className="flex flex-col items-center  md:items-center md:justify-evenly md:flex-row">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? `${navLinkClass} active` : navLinkClass
                        }
                        onClick={onClose}
                        end
                    >
                        Users
                    </NavLink>
                </li>

                {isLoggined && (
                    <>
                        <li>
                            <NavLink
                                to={`/${userId}/places`}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${navLinkClass} active`
                                        : navLinkClass
                                }
                                onClick={onClose}
                                end
                            >
                                My Places
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/places/add"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${navLinkClass} active`
                                        : navLinkClass
                                }
                                onClick={onClose}
                                end
                            >
                                Add Place
                            </NavLink>
                        </li>
                        <li>
                            <Button
                                onClick={logoutHandler}
                                addClass="bg-red-500"
                            >
                                Logout
                            </Button>
                        </li>
                    </>
                )}
                {!isLoggined && (
                    <li>
                        <NavLink
                            to="/account"
                            className={({ isActive }) =>
                                isActive
                                    ? `${navLinkClass} active`
                                    : navLinkClass
                            }
                            onClick={onClose}
                            end
                        >
                            Account
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
