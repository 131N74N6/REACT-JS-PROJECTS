import { Fragment } from "react";
import useGeoloaction from "../Hooks/useGeoloaction";
import useGetWeather from "../Hooks/useGetWeather";
import Loading from "../Utilities/Loading";
import ErrorMessage from "../Utilities/ErrorMessage";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import DataLayout from "../Components/DataLayout";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export default function CurrentLoc() {
    const { geoData, isGeoLoad, geoError } = useGeoloaction();

    const { data: weather } = useGetWeather(
        `${apiUrl}weather?lat=${geoData.latitude}&lon=${geoData.longitude}&appid=${apiKey}`, ""
    );

    const { data: geoForecast } = useGetWeather(
        `${apiUrl}forecast?lat=${geoData.latitude}&lon=${geoData.longitude}&appid=${apiKey}`, ""
    );

    return (
        <Fragment>
            <Header/>
                {isGeoLoad ? <Loading/> : geoError ? <ErrorMessage message={geoError}/> : 
                    <DataLayout apiData1={weather} apiData2={geoForecast}/>
                }
            <Footer/>
        </Fragment>
    )
}
