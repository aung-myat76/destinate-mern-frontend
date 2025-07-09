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
import Loading from "../../shared/components/Loading";
import useHttp from "../../shared/hooks/useHttp";
import ImageUpload from "../../shared/components/ImageUpload";
import FormCard from "../../shared/components/FormCard";

const SignUp = () => {
    const navigate = useNavigate();
    const { isLoading, error, sendRequest } = useHttp();
    const initialForm = {
        inputs: {
            name: {
                value: "",
                isValid: false,
            },
            image: {
                value: null,
                isValid: false,
            },
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

    const { login, token } = useContext(authContext);

    const { formState, onFormHandler } = useForm(initialForm);

    const submitFormHandler = async (e) => {
        e.preventDefault();
        console.log(formState.inputs);
        try {
            const formData = new FormData();
            formData.append("name", formState.inputs.name.value);
            formData.append("email", formState.inputs.email.value);
            formData.append("password", formState.inputs.password.value);
            formData.append("image", formState.inputs.image.value);
            await sendRequest(
                import.meta.env.VITE_BACKEND_URL + "/sign-up",
                (data) => {
                    navigate("/account");
                },
                "POST",
                formData,
                { Authorization: `Bearer ${token}` }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <FormCard title="Sign up" onSubmit={submitFormHandler}>
            <ImageUpload
                id="image"
                onInput={onFormHandler}
                placeholder="/assets/unknownProfile.jpg"
            />
            <Input
                id="name"
                type="text"
                placeholder="Name"
                errorText="Who are you ?"
                validators={[VALIDATOR_REQUIRE()]}
                onFormHandler={onFormHandler}
            />
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
                errorText="Your password must be at least 6 characters"
                validators={[VALIDATOR_MINLENGTH(6)]}
                onFormHandler={onFormHandler}
            />
            <Button
                className="bg-transparent text-center text-stone-500 block font-normal hover:text-stone-400 hover:bg-transparent"
                to={"/account"}
            >
                Login
            </Button>
            <Button
                variant="signup"
                type="submit"
                disabled={!formState.isFormValid}
            >
                {isLoading ? "Signing up" : "Sign up"}
            </Button>
        </FormCard>
    );
};

export default SignUp;
