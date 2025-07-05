import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/Card";
import { authContext } from "../../shared/context/auth-context";

const User = ({ user }) => {
    const { userId } = useContext(authContext);

    return (
        <li>
            <Card addClass="hover:bg-stone-800">
                <Link to={`/${user.id}/places`}>
                    <div className="flex items-center">
                        <img
                            className="w-[50px] h-[50px] rounded-full object-cover"
                            src={`${import.meta.env.VITE_BACKEND_URL}/${
                                user.profile
                            }`}
                            alt="profile"
                        />
                        <div className="ml-3">
                            <h2
                                className={`text-lg font-bold ${
                                    user._id === userId ? "text-blue-900" : null
                                }`}
                            >
                                {user.name}
                            </h2>
                            <p>{user.places.length} places</p>
                        </div>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default User;
