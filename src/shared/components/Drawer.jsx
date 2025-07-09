import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Navigation from "./Navigation";

const Drawer = ({ onClose, show }) => {
    return ReactDOM.createPortal(
        <>
            {/* Backdrop */}
            {show && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                ></div>
            )}

            {/* Drawer Slide */}
            <CSSTransition
                in={show}
                timeout={300}
                classNames="drawer"
                unmountOnExit
            >
                <div className="fixed top-0 right-0 h-full w-10/12 max-w-sm bg-stone-900 text-white shadow-2xl z-50 rounded-l-2xl flex flex-col">
                    <div className="p-4 border-b border-stone-700 flex justify-between items-center">
                        <h2 className="text-lg font-bold">Menu</h2>
                        <button
                            onClick={onClose}
                            className="text-stone-400 hover:text-white text-xl"
                        >
                            &times;
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <Navigation onClose={onClose} />
                    </div>

                    <div className="p-4 border-t border-stone-700">
                        <button
                            onClick={onClose}
                            className="w-full py-2 bg-stone-800 hover:bg-stone-700 rounded-lg text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </>,
        document.getElementById("drawer-root")
    );
};

export default Drawer;
