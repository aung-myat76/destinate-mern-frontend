import React, { useContext } from "react";
import Button from "../../shared/components/Button";
import Place from "./Place";
import { authContext } from "../../shared/context/auth-context";
import { useParams } from "react-router-dom";

const PlacesList = ({ places, refreshPlaces }) => {
    let content;
    const params = useParams();

    const { userId } = useContext(authContext);

    if (places.length > 0) {
        content = (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
                {places.map((place) => (
                    <Place
                        key={place._id}
                        place={place}
                        refreshPlaces={refreshPlaces}
                    />
                ))}
            </ul>
        );
    } else {
        content = (
            <div className="flex flex-col items-center justify-center">
                {userId === params.userId ? (
                    <>
                        <p className="my-3 text-xl">
                            You haven't added places yet, add one?
                        </p>
                        <Button to={`/places/add`}>Add Place</Button>
                    </>
                ) : (
                    <>
                        <p className="my-3 text-xl">
                            This User hasn't added places yet!
                        </p>
                        <Button to={`/`}>Go Back</Button>
                    </>
                )}
            </div>
        );
    }

    return <>{content}</>;
};

export default PlacesList;
