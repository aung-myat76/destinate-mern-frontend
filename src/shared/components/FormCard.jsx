import React from "react";

const FormCard = ({ title, children, onSubmit }) => {
    return (
        <div className="min-h-screen flex items-center justify-center  p-4">
            <form
                onSubmit={onSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-stone-800 text-center">
                    {title}
                </h2>

                {children}
            </form>
        </div>
    );
};

export default FormCard;
