import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navigation from "../shared/components/Navigation";
import HamburgerMenu from "../shared/components/HamburgerMenu";
import Drawer from "../shared/components/Drawer";
import Overlay from "../shared/components/Overlay";

const MainLayout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawerHandler = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawerHandler = () => {
        setIsDrawerOpen(false);
    };

    return (
        <>
            {isDrawerOpen && <Overlay onClose={closeDrawerHandler} />}
            <header className="bg-orange-700 text-white flex items-center justify-between p-3 mb-5">
                <div>
                    <Link to="/" className="text-2xl font-bold">
                        Distinate
                    </Link>
                </div>
                <HamburgerMenu onOpen={openDrawerHandler} />
                <div className="hidden md:block">
                    <Navigation />
                </div>
            </header>
            {isDrawerOpen && <Drawer onClose={closeDrawerHandler} />}
            <main className="center">
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
