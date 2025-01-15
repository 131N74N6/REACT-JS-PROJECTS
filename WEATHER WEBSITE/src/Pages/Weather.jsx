import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import DataLayout from "../Components/DataLayout";
import useGetWeather from "../Hooks/useGetWeather";
import Loading from "../Utilities/Loading";
import ErrorMessage from "../Utilities/ErrorMessage";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export default function Weather() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const getKeyword = params.get("q");

    const { data: weatherInfo, isLoading: weatherLoading, error: weatherError } = useGetWeather(
        `${apiUrl}weather?q=${getKeyword}&appid=${apiKey}`, "City not Found"
    );

    const { data: forecastData } = useGetWeather(
        `${apiUrl}forecast?q=${getKeyword}&appid=${apiKey}`, ""
    );

    return (
        <Fragment>
            <Header/>
            {weatherLoading ? <Loading/> : weatherError ? 
                weatherError.name === "TypeError" && weatherError.message === "Failed to fetch" ?
                <ErrorMessage message={"Check Your Internet Connection"}/> : 
                <ErrorMessage message={weatherError?.message}/> :
                <DataLayout apiData1={weatherInfo} apiData2={forecastData}/>
            }
        </Fragment>
    )
}
