import React, { useReducer, useCallback } from "react";

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE": {
            const updatedInputs = {
                ...state.inputs,
                [action.id]: {
                    value: action.value,
                    isValid: action.isValid,
                },
            };

            let isFormValid = true;

            for (let inputId in updatedInputs) {
                isFormValid = isFormValid && updatedInputs[inputId].isValid;
            }
            return {
                ...state,
                inputs: updatedInputs,
                isFormValid: isFormValid,
            };
        }
        case "SET_DATA":
            return {
                inputs: action.inputs,
                isFormValid: action.isFormValid,
            };
        default:
            return state;
    }
};

const useForm = (initialForm) => {
    const [formState, dispatch] = useReducer(formReducer, initialForm);

    const onFormHandler = useCallback(
        (id, value, isValid) => {
            dispatch({
                type: "INPUT_CHANGE",
                id: id,
                value: value,
                isValid: isValid,
            });
        },
        [dispatch]
    );

    const setFormData = useCallback((inputs, isFormValid) => {
        dispatch({
            type: "SET_DATA",
            inputs,
            isFormValid,
        });
    }, []);

    return {
        formState,
        onFormHandler,
        setFormData,
    };
};

export default useForm;
