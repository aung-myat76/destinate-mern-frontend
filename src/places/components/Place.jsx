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
    const { isLoading, error, sendRequest } = useHttp();
    const { userId } = useContext(authContext);

    const { isLoggined, token } = useContext(authContext);

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

    const { name, address, image } = place;

    return (
        <li>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden w-72">
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${image}`}
                    alt={name}
                    className="w-full h-40 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800">{name}</h2>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                        📍 {address}
                    </p>

                    {/* {creator && (
                        <p className="mt-2 text-xs text-gray-400 italic">
                            Added by {creator}
                        </p>
                    )} */}
                </div>
                <div className="center flex-row py-2 gap-2">
                    <Button
                        to={`/${userId}/places/${place._id}`}
                        variant="orange"
                    >
                        View Detail
                    </Button>
                    {isLoggined && userId === place.userId && (
                        <>
                            <Button variant="info" to={`/places/${place._id}`}>
                                Edit
                            </Button>
                            <form
                                id="delete-place"
                                onSubmit={deletePlaceHandler}
                            >
                                <Button variant="danger">
                                    {isLoading ? "Deleting..." : "Delete"}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </li>
    );
};

export default Place;
