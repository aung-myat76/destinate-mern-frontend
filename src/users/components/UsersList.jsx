import React from "react";
import User from "./User";

const UsersList = ({ users }) => {
    let content;

    if (users.length > 0) {
        content = (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {users.map((user) => (
                    <User key={user.id} user={user} />
                ))}
            </ul>
        );
    } else {
        content = <p>There's no users!</p>;
    }

    return <>{content}</>;
};

export default UsersList;
