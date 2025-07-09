import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { authContext } from "../../shared/context/auth-context";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import Card from "../../shared/components/Card";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../util/validators";
import useForm from "../../shared/hooks/useForm";
import useHttp from "../../shared/hooks/useHttp";
import FormCard from "../../shared/components/FormCard";

const Login = () => {
    const navigate = useNavigate();

    const { isLoading, error, sendRequest, data } = useHttp();

    const initialForm = {
        inputs: {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        isFormValid: false,
    };

    const { login } = useContext(authContext);

    const { formState, onFormHandler } = useForm(initialForm);

    const submitFormHandler = async (e) => {
        e.preventDefault();

        try {
            await sendRequest(
                import.meta.env.VITE_BACKEND_URL + "/login",
                (data) => {
                    const uid = data.user._id;
                    const token = data.token;
                    login(uid, token);
                    navigate("/");
                },
                "POST",
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                }),
                { "Content-Type": "application/json" }
            );
        } catch (err) {
            console.log(err);
        }
        console.log(formState);
    };

    return (
        <FormCard title="Login" onSubmit={submitFormHandler}>
            <Input
                id="email"
                type="email"
                placeholder="Email"
                errorText="Your email is incorrect!"
                validators={[VALIDATOR_EMAIL()]}
                onFormHandler={onFormHandler}
            />
            <Input
                id="password"
                type="password"
                placeholder="password"
                errorText="Your password is wrong!"
                validators={[VALIDATOR_MINLENGTH(6)]}
                onFormHandler={onFormHandler}
            />
            <Button
                className="bg-transparent text-center text-stone-500 block font-normal hover:text-stone-400 hover:bg-transparent"
                to={"/account/create"}
            >
                Sign up
            </Button>
            <Button
                variant="login"
                type="submit"
                disabled={!formState.isFormValid}
            >
                {isLoading ? "Logging in..." : "Login"}
            </Button>
        </FormCard>
    );
};

export default Login;
