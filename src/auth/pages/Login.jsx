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
        <Card addClass="py-5 px-3 rounded-xl bg-stone-900">
            <div>
                <h2 className="headerText">Login to your account</h2>
            </div>
            <form onSubmit={submitFormHandler}>
                <Input
                    id="email"
                    placeholder="Email"
                    errorText="Your email is incorrect!"
                    validators={[VALIDATOR_EMAIL()]}
                    onFormHandler={onFormHandler}
                />
                <Input
                    id="password"
                    placeholder="password"
                    errorText="Your password is wrong!"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    onFormHandler={onFormHandler}
                />
                <Button
                    addClass="bg-transparent text-center text-stone-500 block font-normal hover:text-stone-400 hover:bg-transparent"
                    to={"/account/create"}
                >
                    Sign up
                </Button>
                <Button
                    addClass="block bg-blue-900 w-[50%] m-auto hover:bg-blue-800"
                    type="submit"
                    disabled={!formState.isFormValid}
                >
                    {isLoading ? "Loading..." : "Login"}
                </Button>
            </form>
        </Card>
    );
};

export default Login;
