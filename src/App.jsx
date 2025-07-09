import React, { lazy, Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// import UsersPage from "./users/pages/UsersPage";
// import AddPlace from "./places/pages/AddPlace";
// import Places from "./places/pages/Places";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Login from "./auth/pages/Login";
// import SignUp from "./auth/pages/SignUp";
import {
    authContext,
    AuthContextProvider,
} from "./shared/context/auth-context";
import Loading from "./shared/components/Loading";
import NotFoundPage from "./shared/pages/NotFoundPage";

const UsersPage = lazy(() => import("./users/pages/UsersPage"));
const AddPlace = lazy(() => import("./places/pages/AddPlace"));
const Places = lazy(() => import("./places/pages/Places"));
const PlaceDetail = lazy(() => import("./places/pages/PlaceDetail"));
const UpdatePlace = lazy(() => import("./places/pages/UpdatePlace"));
const Login = lazy(() => import("./auth/pages/Login"));
const SignUp = lazy(() => import("./auth/pages/SignUp"));

const App = () => {
    const { token, isAuthReady, userId } = useContext(authContext);

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<UsersPage />} />
                <Route path="/:userId/places" element={<Places />} />
                <Route
                    path="/:userId/places/:placeId"
                    element={<PlaceDetail />}
                />
                {isAuthReady && token && (
                    <>
                        <Route path="/places/add" element={<AddPlace />} />
                        <Route
                            path="/places/:placeId"
                            element={<UpdatePlace />}
                        />
                    </>
                )}

                <Route path="/account" element={<Login />} />
                <Route path="/account/create" element={<SignUp />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default App;
