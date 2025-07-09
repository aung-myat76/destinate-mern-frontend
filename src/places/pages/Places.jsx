import React, { useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";

import PlacesList from "../components/PlacesList";
import useHttp from "../../shared/hooks/useHttp";
import Loading from "../../shared/components/Loading";

const Places = () => {
    const { userId } = useParams();
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const { isLoading, error, sendRequest, data } = useHttp();

    useEffect(() => {
        const fetchData = async () => {
            await sendRequest(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/places/users/${userId}`,
                (data) => {
                    console.log("fetched places: ", data);
                    setLoadedPlaces(data.place.places);
                }
            );
        };
        fetchData();
    }, [sendRequest, useId]);

    const refreshPlaces = (deletedPlaceId) => {
        setLoadedPlaces((prevPlaces) =>
            prevPlaces.filter((p) => p._id !== deletedPlaceId)
        );
    };

    console.log(loadedPlaces);

    return (
        <>
            {isLoading && <Loading loading={isLoading} />}
            {!isLoading && data && loadedPlaces && (
                <PlacesList
                    places={loadedPlaces}
                    refreshPlaces={refreshPlaces}
                />
            )}
        </>
    );
};

export default Places;
