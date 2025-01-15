import { useEffect, useState } from "react";

export default function useGeoloaction() {
    const [geoData, setGeoData] = useState({});
    const [geoError, setGeoError] = useState("");
    const [isGeoLoad, setGeoLoad] = useState(false);

    useEffect(() => {
        if (navigator.onLine) {
            setGeoLoad(true);
            navigator.geolocation.getCurrentPosition((position) => {
                setGeoData(position.coords);
                setGeoLoad(false);
                setGeoError("");
            }, (error) => {
                if (error.PERMISSION_DENIED) {
                    setGeoError("Premission Denied by User");
                }
                else if (error.POSITION_UNAVAILABLE) {
                    setGeoError("Warning! Unknown Position!");
                }
                else if (error.TIMEOUT) {
                    setGeoError("Request Ended");
                }
                else {
                    setGeoError("Opps.. Unknown Error Detected");
                }
                setGeoLoad(false);
            })
            setGeoLoad(false);
        }
        else {
            setGeoLoad(false);
            setGeoError("Check Your Internet Connection");
        }
    }, []);

    return { geoData, isGeoLoad, geoError }
}
