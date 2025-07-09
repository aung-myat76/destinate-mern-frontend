import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/Card";
import { authContext } from "../../shared/context/auth-context";
import UserProfileCard from "../../shared/components/UserProfileCard";

const User = ({ user }) => {
    const { userId } = useContext(authContext);

    return (
        <li>
            <UserProfileCard user={user} />
            {/* <Card addClass="hover:bg-stone-800 mb-8 my-5">
                <Link to={`/${user.id}/places`}>
                    <div className="flex flex-col shadow-lg">
                        <img
                            className="w-[100%] h-[50%] rounded-ss-xl rounded-se-xl object-cover"
                            src={`${import.meta.env.VITE_BACKEND_URL}/${
                                user.profile
                            }`}
                            alt="profile"
                        />
                        <div className="ml-3 my-auto py-3 px-2">
                            <h2
                                className={`text-lg font-bold ${
                                    user._id === userId ? "text-blue-700" : null
                                }`}
                            >
                                Username: {user.name}
                            </h2>
                            <p>
                                <span className="underline">{user.name}</span>{" "}
                                have posted{" "}
                                <span className="font-bold text-yellow-500">
                                    {user.places.length} places
                                </span>
                            </p>
                        </div>
                    </div>
                </Link>
            </Card> */}
        </li>
    );
};

export default User;
