import React from "react";
import { CSSTransition } from "react-transition-group";

const Loading = ({ loading }) => {
    return (
        <CSSTransition
            in={loading}
            timeout={300}
            classNames="spinner"
            unmountOnExit
        >
            <div className="loader"></div>
        </CSSTransition>
    );
};

export default Loading;
