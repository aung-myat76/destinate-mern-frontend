import React, { useEffect, useReducer } from "react";
import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators),
            };
        case "TOUCHED": {
            return {
                ...state,
                isTouched: true,
            };
        }
        default:
            return state;
    }
};

const Input = ({
    id,
    onFormHandler,
    inputType = "input",
    type = "text",
    addClass = "",
    initialValue,
    initialValidity,
    validators,
    errorText = "",
    placeholder,
    ...otherprops
}) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || "",
        isValid: initialValidity || false,
        isTouched: false,
    });

    const { value, isValid } = inputState;

    useEffect(() => {
        onFormHandler(id, value, isValid);
    }, [id, value, isValid, onFormHandler]);

    const changeInputHandler = (e) => {
        dispatch({
            type: "CHANGE",
            value: e.target.value,
            validators: validators,
        });
    };

    const BlurInputHandler = () => {
        dispatch({ type: "TOUCHED" });
    };

    const inputClass = `w-[250px] text-stone-700 p-3 my-2 rounded-md bg-stone-100 border-b-4 border-b-blue-500  ${addClass} focus:outline-none focus:border-b-green-500 ${
        !inputState.isValid && inputState.isTouched
            ? "border-b-red-500 focus:border-b-red-500"
            : null
    } md:w-[400px]`;

    let inputElement;

    if (inputType === "textarea") {
        inputElement = (
            <textarea
                placeholder={placeholder}
                className={`${inputClass}`}
                value={inputState.value}
                onChange={changeInputHandler}
                onBlur={BlurInputHandler}
                {...otherprops}
            />
        );
    } else {
        inputElement = (
            <input
                placeholder={placeholder}
                type={type}
                className={`${inputClass}`}
                value={inputState.value}
                onChange={changeInputHandler}
                onBlur={BlurInputHandler}
                {...otherprops}
            />
        );
    }

    return (
        <div className="center flex-col mb-3">
            {inputElement}
            {!inputState.isValid && inputState.isTouched && (
                <p className="font-bold text-red-500 max-w-[450px]">
                    {errorText}
                </p>
            )}
        </div>
    );
};

export default Input;
