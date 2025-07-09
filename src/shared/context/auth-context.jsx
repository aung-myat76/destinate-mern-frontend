import { createContext, useCallback, useEffect, useState, useRef } from "react";

export const authContext = createContext({
    isLoggined: false,
    userId: null,
    token: null,
    isAuthReady: false,
    login: () => {},
    logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [userId, setUserId] = useState();
    const [token, setToken] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    const [expirationDate, setExpirationDate] = useState();

    const timeoutId = useRef();

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        const expDate =
            expirationDate || new Date(new Date().getTime() + 3600000);
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

        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
    }, []);

    const authValue = {
        isLoggined: !!token,
        token,
        userId,
        isAuthReady,
        login,
        logout,
    };

    useEffect(() => {
        if (token && expirationDate) {
            const remainingTime =
                new Date(expirationDate).getTime() - new Date().getTime();

            if (remainingTime <= 0) {
                logout();
                return;
            }
            timeoutId.current = setTimeout(logout, remainingTime);

            return () => {
                clearTimeout(timeoutId.current);
            };
        }
    }, [token, logout, expirationDate]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (
            user &&
            user.userId &&
            user.token &&
            new Date(user.expirationDate).getTime() > new Date().getTime()
        ) {
            login(user.userId, user.token, new Date(user.expirationDate));
        }
        setIsAuthReady(true); // ✅ Mark as ready after checking
    }, [login]);

    return (
        <authContext.Provider value={authValue}>
            {children}
        </authContext.Provider>
    );
};
