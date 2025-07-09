import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { authContext } from "../context/auth-context";

const UserProfileCard = ({ user }) => {
    const { userId } = useContext(authContext);

    const { name, profile, places } = user;
    return (
        <Link to={`/${user.id}/places`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-64">
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${profile}`}
                    alt={name}
                    className={`w-24 h-24 rounded-full object-cover border-4 ${
                        user._id.toString() === userId
                            ? "border-blue-200"
                            : "border-stone-200"
                    } `}
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                    {name}
                </h2>
                <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                    <span>📍</span> {places.length}{" "}
                    {places.length === 1 ? "Place" : "Places"} Visited
                </p>
            </div>
        </Link>
    );
};

export default UserProfileCard;
