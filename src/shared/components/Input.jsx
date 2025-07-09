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
        case "TOUCHED":
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

const Input = ({
    id,
    onFormHandler,
    inputType = "input", // "input" or "textarea"
    type = "text", // input type: text, email, password etc.
    addClass = "",
    initialValue = "",
    initialValidity = false,
    validators = [],
    errorText = "Invalid input",
    placeholder = "",
    ...otherprops
}) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue,
        isValid: initialValidity,
        isTouched: false,
    });

    const { value, isValid, isTouched } = inputState;

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

    const blurInputHandler = () => {
        dispatch({ type: "TOUCHED" });
    };

    const baseInputStyle = `
      w-full p-3 rounded-lg border focus:outline-none transition
      ${
          isTouched && !isValid
              ? "border-red-500 focus:ring-red-500"
              : "border-stone-300 focus:ring-2 focus:ring-stone-500"
      }
      bg-stone-100 text-stone-800 ${addClass}
    `;

    let inputElement;

    if (inputType === "textarea") {
        inputElement = (
            <textarea
                id={id}
                placeholder={placeholder}
                className={baseInputStyle}
                value={value}
                onChange={changeInputHandler}
                onBlur={blurInputHandler}
                {...otherprops}
            />
        );
    } else {
        inputElement = (
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={baseInputStyle}
                value={value}
                onChange={changeInputHandler}
                onBlur={blurInputHandler}
                {...otherprops}
            />
        );
    }

    return (
        <div className="flex flex-col gap-1 mb-4 w-full max-w-md">
            {inputElement}
            {isTouched && !isValid && (
                <p className="text-red-500 text-sm font-medium">{errorText}</p>
            )}
        </div>
    );
};

export default Input;
