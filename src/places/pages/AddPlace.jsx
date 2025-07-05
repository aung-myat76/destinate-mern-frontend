import React, { useCallback, useContext, useReducer } from "react";

import { useNavigate } from "react-router-dom";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import Card from "../../shared/components/Card";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import useForm from "../../shared/hooks/useForm";
import useHttp from "../../shared/hooks/useHttp";
import { authContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/ImageUpload";

const AddPlace = () => {
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, data } = useHttp();
    const { userId, token } = useContext(authContext);

    const initialForm = {
        inputs: {
            name: {
                value: "",
                isValid: false,
            },
            address: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            image: {
                value: null,
                isValid: false,
            },
        },
        isFormValid: false,
    };

    const { formState, onFormHandler } = useForm(initialForm);

    const submitFormHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("description", formState.inputs.description.value);
        formData.append("address", formState.inputs.address.value);
        formData.append("location", 24.24);
        formData.append("userId", userId);
        formData.append("image", formState.inputs.image.value);

        try {
            await sendRequest(
                import.meta.env.VITE_BACKEND_URL + "/api/places/add-place",
                (data) => {
                    navigate(`/${userId}/places`);
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
        <Card addClass="py-5 px-3 rounded-xl bg-stone-900">
            {/* <div>
                <h2 className="headerText">Create Your own places</h2>
            </div> */}
            <form onSubmit={submitFormHandler}>
                <ImageUpload
                    id="image"
                    onInput={onFormHandler}
                    placeholder="/assets/unknownPlace.jpg"
                />
                <Input
                    id="name"
                    placeholder="Name of the Place"
                    errorText="Place give the name of the place!"
                    validators={[VALIDATOR_REQUIRE()]}
                    onFormHandler={onFormHandler}
                />
                <Input
                    id="address"
                    placeholder="Address"
                    errorText="Where it is ?"
                    validators={[VALIDATOR_REQUIRE()]}
                    onFormHandler={onFormHandler}
                />
                <Input
                    id="description"
                    placeholder="Description"
                    inputType="textarea"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                    errorText="Place subscribe your place description at least in 5 letters!"
                    onFormHandler={onFormHandler}
                />
                <Button type="submit" disabled={!formState.isFormValid}>
                    {isLoading ? "Loading..." : "Add Place"}
                </Button>
            </form>
        </Card>
    );
};

export default AddPlace;
