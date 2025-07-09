import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthContextProvider } from "./shared/context/auth-context.jsx";

import "./index.css";
import "leaflet/dist/leaflet.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <StrictMode>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </StrictMode>
    </BrowserRouter>
);
