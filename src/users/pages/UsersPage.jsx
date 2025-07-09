import React, { useEffect } from "react";
import UsersList from "../components/UsersList";
import useHttp from "../../shared/hooks/useHttp";
import Loading from "../../shared/components/Loading";

const UsersPage = () => {
    const { isLoading, error, sendRequest, data } = useHttp();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await sendRequest(
                    import.meta.env.VITE_BACKEND_URL + "/api/users",
                    () => {
                        console.log("fetched data!");
                    }
                );
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [sendRequest]);

    if (!isLoading && !data) {
        return (
            <>
                <p className="center text-xl">There's no users yet!</p>
            </>
        );
    }

    return (
        <>
            {isLoading && <Loading loading={isLoading} />}
            {!isLoading && data && <UsersList users={data.users} />}
        </>
    );
};

export default UsersPage;
