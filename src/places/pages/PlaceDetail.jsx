import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { Card, CardContent } from "@/components/ui/card";
import Button from "../../shared/components/Button";
import { useParams } from "react-router-dom";
import useHttp from "../../shared/hooks/useHttp";
import Loading from "../../shared/components/Loading";
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// This is needed because Leaflet by default looks for the images in the public folder
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: markerShadow,
});

const MapResizer = () => {
    const map = useMap();

    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 300); // Delay slightly (200–500ms works well in most cases)

        return () => clearTimeout(timer);
    }, [map]);

    return null;
};

const PlaceDetail = () => {
    const { placeId } = useParams();
    const [place, setPlace] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const { sendRequest, isLoading, error, data } = useHttp();

    const fetchCoordinates = useCallback(async (address) => {
        setIsLoadingLocation(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    address
                )}`
            );
            const data = await response.json();
            setIsLoadingLocation(false);
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                return { lat: parseFloat(lat), lng: parseFloat(lon) };
            } else {
                console.log("No coordinates found for this address.");
                return null;
            }
        } catch (err) {
            console.error("Failed to fetch coordinates:", err);
            setIsLoadingLocation(false);
            return null;
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await sendRequest(
                `${import.meta.env.VITE_BACKEND_URL}/api/places/${placeId}`,
                (data) => {
                    console.log("fetched places: ", data);
                    let loadedPlace = data.place;

                    if (loadedPlace.address) {
                        fetchCoordinates(loadedPlace.address).then((coords) => {
                            console.log(coords);
                            if (coords) {
                                setPlace({ ...loadedPlace, location: coords });
                            } else {
                                console.log("Failed to load place location");
                            }
                        });
                    } else {
                        console.log("Cannot find the place");
                    }
                }
            );
        };
        fetchData();
    }, [sendRequest, placeId, fetchCoordinates]);

    if (!isLoading && !place && !isLoadingLocation)
        return (
            <div className="text-center mt-10 text-xl">
                No place data available
            </div>
        );

    return (
        <>
            {isLoading && isLoadingLocation && <Loading loading={isLoading} />}
            {place && !isLoading && (
                <div className="max-w-4xl mx-auto p-4">
                    <div className="rounded-2xl shadow-lg overflow-hidden">
                        <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/${
                                place.image
                            }`}
                            alt={place.name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-2">
                                {place.name}
                            </h1>
                            <p className="text-gray-600 mb-4">
                                {place.address}
                            </p>
                            <p className="text-base text-gray-800 mb-6 leading-relaxed">
                                {place.description}
                            </p>

                            <div className="h-64 rounded-2xl overflow-hidden shadow-md mb-4 z-40">
                                <MapContainer
                                    center={[
                                        place.location?.lat || 16.8409,
                                        place.location?.lng || 96.1735,
                                    ]}
                                    zoom={13}
                                    style={{ width: "100%", height: "100%", zIndex: 10 }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker
                                        position={[
                                            place.location?.lat || 16.8409,
                                            place.location?.lng || 96.1735,
                                        ]}
                                    >
                                        <Popup>{place.name}</Popup>
                                    </Marker>
                                    <MapResizer />
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PlaceDetail;
