import React, { useState, useCallback, useEffect, useRef } from "react";

const useHttp = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const activeHttpReq = useRef([]);

    const sendRequest = useCallback(async (url, cb, method, body, headers) => {
        const controller = new AbortController();
        const signal = controller.signal;

        activeHttpReq.current.push(controller);
        try {
            setIsLoading(true);
            const res = await fetch(url, {
                method: method || "GET",
                body: !body && !method ? null : body,
                headers: headers || {},
                // headers: !isFormData
                //     ? {
                //           "Content-Type": "application/json",
                //       }
                //     : { Authorization: `Bearer ${token}` },
                signal,
            });

            if (!res.ok) {
                throw new Error(
                    "Something went wrong! error code: " + res.status
                );
            }

            const resData = await res.json();

            activeHttpReq.current = activeHttpReq.current.filter(
                (req) => req !== controller
            );

            cb(resData);
            setData(resData);
            console.log(resData);

            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            setError(err.message);
        }
    }, []);

    useEffect(() => {
        return () => {
            activeHttpReq.current.forEach((abortCtrl) => abortCtrl.abort());
        };
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
        data,
    };
};

export default useHttp;
