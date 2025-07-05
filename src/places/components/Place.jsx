import React, { useState, useRef, useEffect, useContext } from "react";
import Card from "../../shared/components/Card";
import Button from "../../shared/components/Button";
import Dialog from "../../shared/components/Dialog";

import { authContext } from "../../shared/context/auth-context";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useHttp from "../../shared/hooks/useHttp";
import { useNavigate } from "react-router-dom";

function ResizeMap({ trigger }) {
    const map = useMap();

    useEffect(() => {
        if (trigger) {
            setTimeout(() => {
                map.invalidateSize();
            }, 200);
        }
    }, [trigger, map]);

    return null;
}

const Map = ({ isMapOpen, location, name }) => (
    <div
        className={`h-[450px] w-[100%] overflow-hidden ${
            isMapOpen ? "block" : "hidden"
        }`}
    >
        <MapContainer
            center={location}
            zoom={16}
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            <ResizeMap trigger={isMapOpen} />
            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            <Marker position={location}>
                <Popup>{name}</Popup>
            </Marker>
        </MapContainer>
    </div>
);

const Place = ({ place, refreshPlaces }) => {
    const navigate = useNavigate();
    const [isMapOpen, setisMapOpen] = useState(false);
    const dialogRef = useRef();
    const { isLoading, error, sendRequest } = useHttp();
    const { userId } = useContext(authContext);

    const { isLoggined, token } = useContext(authContext);

    const openMapHandler = () => {
        setisMapOpen(true);
    };

    const closeMapHandler = () => {
        setisMapOpen(close);
    };

    const deletePlaceHandler = async (e) => {
        e.preventDefault();
        if (confirm("Are you sure to delete?")) {
            try {
                const fetchData = async () => {
                    await sendRequest(
                        `${import.meta.env.VITE_BACKEND_URL}/api/places/${
                            place._id
                        }`,
                        (data) => {
                            console.log("deleted place: ", data);
                            refreshPlaces(place._id);
                            navigate(`/${userId}/places`);
                        },
                        "DELETE",
                        null,
                        { Authorization: `Bearer ${token}` }
                    );
                };
                fetchData();
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <li>
            <Dialog
                ref={dialogRef}
                isMapOpen={isMapOpen}
                onClose={closeMapHandler}
            >
                <h2 className="text-xl font-semibold mb-2">
                    Mapping your destination...
                </h2>
                <Map
                    isMapOpen={isMapOpen}
                    location={place.lotion}
                    name={place.name}
                />
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={closeMapHandler}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </Dialog>
            <Card addClass="bg-stone-800 hover:translate-y-[-8px]">
                <div>
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/${
                            place.image
                        }`}
                        className="w-80 h-80 object-cover"
                    />
                </div>

                <div className="center flex-col my-3">
                    <h2 className="text-xl font-bold my-2">{place.name}</h2>
                    <p className="">{place.address}</p>
                    <p className="opacity-50">{place.description}</p>
                </div>
                <div className="center flex-row">
                    <Button
                        onClick={openMapHandler}
                        addClass="bg-orange-800 hover:bg-orange-700"
                    >
                        View on map
                    </Button>
                    {isLoggined && userId === place.userId && (
                        <>
                            <Button
                                addClass="bg-blue-800 hover:bg-blue-700"
                                to={`/places/${place._id}`}
                            >
                                Edit
                            </Button>
                            <form onSubmit={deletePlaceHandler}>
                                <Button addClass="bg-red-800 hover:bg-red-700">
                                    {isLoading ? "Deleting" : "Delete"}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </Card>
        </li>
    );
};

export default Place;
