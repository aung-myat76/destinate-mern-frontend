import React from "react";
import User from "./User";

const UsersList = ({ users }) => {
    let content;

    if (users.length > 0) {
        content = (
            <ul>
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
