import React from "react";
import Button from "../../shared/components/Button";
import Place from "./Place";

const PlacesList = ({ places, refreshPlaces }) => {
    let content;

    if (places.length > 0) {
        content = (
            <ul>
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
                <p className="my-3">You haven't add places yet!</p>
                <Button to={`/places/add`}>Add Place</Button>
            </div>
        );
    }

    return <>{content}</>;
};

export default PlacesList;
