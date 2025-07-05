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

    const { login } = useContext(authContext);

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
                () => {
                    navigate("/account");
                },
                "POST",
                formData,
                true
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="center  flex-col">
            <div>
                <h2 className="headerText text-stone-900">
                    Create your own account
                </h2>
            </div>
            <Card addClass="py-5 px-3 rounded-xl bg-stone-900">
                <form onSubmit={submitFormHandler}>
                    <ImageUpload
                        id="image"
                        onInput={onFormHandler}
                        placeholder="/assets/unknownProfile.jpg"
                    />
                    <Input
                        id="name"
                        placeholder="Name"
                        errorText="Who are you ?"
                        validators={[VALIDATOR_REQUIRE()]}
                        onFormHandler={onFormHandler}
                    />
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
                        errorText="Your password must be at least 6 characters"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        onFormHandler={onFormHandler}
                    />
                    <Button
                        addClass="bg-transparent text-center text-stone-500 block font-normal hover:text-stone-400 hover:bg-transparent"
                        to={"/account"}
                    >
                        Login
                    </Button>
                    <Button
                        addClass="block bg-green-900 w-[50%] m-auto hover:bg-green-800"
                        type="submit"
                        disabled={!formState.isFormValid}
                    >
                        {isLoading ? "Loading..." : "Sign up"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default SignUp;
