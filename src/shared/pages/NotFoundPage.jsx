import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center  p-6">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl mb-2">Page Not Found</h2>
            <p className="text-stone-400 mb-6 text-center max-w-md">
                The page you are looking for doesn’t exist or has been moved.
            </p>

            <Button
                onClick={() => navigate("/")}
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg shadow-lg"
            >
                Go Home
            </Button>
        </div>
    );
};

export default NotFoundPage;
