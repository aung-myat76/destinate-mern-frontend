import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";

import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import useForm from "../../shared/hooks/useForm";
import useHttp from "../../shared/hooks/useHttp";
import Loading from "../../shared/components/Loading";
import Card from "../../shared/components/Card";
import { authContext } from "../../shared/context/auth-context";
import FormCard from "../../shared/components/FormCard";

const UpdatePlace = () => {
    const { placeId } = useParams();
    const [loadedPlace, setLoadedPlace] = useState();
    const { isLoading, error, sendRequest, data } = useHttp();
    const navigate = useNavigate();
    const { userId, token } = useContext(authContext);

    const initialForm = {
        inputs: {
            name: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        isFormValid: false,
    };
    const { formState, onFormHandler, setFormData } = useForm(initialForm);

    useEffect(() => {
        try {
            const fetchData = async () => {
                await sendRequest(
                    `${import.meta.env.VITE_BACKEND_URL}/api/places/${placeId}`,
                    (data) => {
                        console.log("fetched places: ", data);
                        setLoadedPlace(data.place);
                        setFormData({
                            name: {
                                value: data.place.name,
                                isValid: true,
                            },
                            description: {
                                value: data.place.description,
                                isValid: true,
                            },
                        });
                    }
                );
            };
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }, [setFormData, sendRequest, placeId]);

    const submitFormHandler = async (e) => {
        e.preventDefault();

        try {
            const fetchData = async () => {
                await sendRequest(
                    `${import.meta.env.VITE_BACKEND_URL}/api/places/${placeId}`,
                    (data) => {
                        console.log("updated place: ", data);
                        navigate(`/${userId}/places`);
                    },
                    "PATCH",
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        description: formState.inputs.description.value,
                    }),
                    {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                );
            };
            fetchData();
        } catch (err) {
            console.log(err);
        }

        console.log(formState);
    };

    return (
        <div>
            {isLoading && <Loading loading={isLoading} />}
            {!isLoading && data && loadedPlace && (
                <FormCard title="Update place" onSubmit={submitFormHandler}>
                    <Input
                        id="name"
                        placeholder="Name of the Place"
                        errorText="Place give the name of the place!"
                        validators={[VALIDATOR_REQUIRE()]}
                        onFormHandler={onFormHandler}
                        initialValue={loadedPlace.name}
                        initialValidity={true}
                    />
                    <Input
                        id="description"
                        placeholder="Description"
                        inputType="textarea"
                        validators={[
                            VALIDATOR_REQUIRE(),
                            VALIDATOR_MINLENGTH(5),
                        ]}
                        errorText="Place subscribe your place description at least in 5 letters!"
                        onFormHandler={onFormHandler}
                        initialValue={loadedPlace.description}
                        initialValidity={true}
                    />
                    <Button
                        variant="info"
                        type="submit"
                        disabled={!formState.isFormValid}
                    >
                        {isLoading ? "Updating Place..." : "Update Place"}
                    </Button>
                </FormCard>
            )}
        </div>
    );
};

export default UpdatePlace;
