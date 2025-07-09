import React, { useEffect } from "react";
import UsersList from "../components/UsersList";
import useHttp from "../../shared/hooks/useHttp";
import Loading from "../../shared/components/Loading";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const { isLoading, error, sendRequest, data } = useHttp();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await sendRequest(
                    import.meta.env.VITE_BACKEND_URL + "/api/users",
                    () => {
                        console.log("fetched data!");
                        setUsers(data.users || []);
                    }
                );
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [sendRequest]);

    if (!isLoading && users.length <= 0) {
        return (
            <>
                <p className="center text-xl">There's no users yet!</p>
            </>
        );
    }

    return (
        <>
            {isLoading && <Loading loading={isLoading} />}
            {!isLoading && users && users.length > 0 && (
                <UsersList users={users} />
            )}
        </>
    );
};

export default UsersPage;
