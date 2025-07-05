import { createContext, useCallback, useEffect, useState, useRef } from "react";

export const authContext = createContext({
    isLoggined: false,
    userId: null,
    token: null,
    login: () => {},
    logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [userId, setUserId] = useState();
    const [token, setToken] = useState(null);
    const [expirationDate, setExpirationDate] = useState();

    const timeoutId = useRef();

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        const expDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        localStorage.setItem(
            "user",
            JSON.stringify({
                userId: uid,
                token,
                expirationDate: expDate.toISOString(),
            })
        );
        setExpirationDate(expDate);
        setUserId(uid);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem("user");
        setExpirationDate(null);
        setUserId(null);
    }, []);

    const authValue = {
        isLoggined: !!token,
        token,
        userId,
        login,
        logout,
    };

    useEffect(() => {
        const remainingTime =
            new Date(expirationDate).getTime() - new Date().getTime();

        if (remainingTime <= 0) {
            logout();
            return;
        }
        timeoutId.current = setTimeout(logout, remainingTime);

        return () => {
            setExpirationDate(null);
            clearTimeout(timeoutId.current);
        };
    }, [logout, expirationDate]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (
            user &&
            user.userId &&
            user.token &&
            new Date(user.expirationDate) > new Date().getTime()
        ) {
            login(user.userId, user.token, new Date(user.expirationDate));
        }
    }, [login]);

    return (
        <authContext.Provider value={authValue}>
            {children}
        </authContext.Provider>
    );
};
