import { Fragment, useMemo } from "react";
import Header from "../Components/Header";
import { useQuery } from "@tanstack/react-query";
import CountryData from "../Data/CountryData";
import { useParams } from "react-router-dom";
import Loading from "../Utilities/Loading";
import "./Detail.css";
import Footer from "../Components/Footer";
import ErrorMessage from "../Utilities/ErrorMessage";

export default function Detail() {
    const { name } = useParams();

    const { data: detailInfo, isLoading, error } = useQuery({
        queryKey: useMemo(() => ["detail-info", name], [name]),
        queryFn: async () => await CountryData(
            `https://restcountries.com/v3.1/name/${name}?fullText=true`, "Check Your Internet Connection"
        ),
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 15
    });

    return (
        <Fragment>
            <Header page={2}/>
            <div className="info-wrap">
                {isLoading ? <Loading/> :
                    error ? <ErrorMessage message={error.message}/> : 
                    detailInfo?.map((info, index) => (
                        <div key={index} className="info-content">
                            <div className="inform-1">
                                <div>Area : {info?.area || "-"}</div>
                                <div>Region : {info?.region || "-"}</div>
                                <div>Sub-Region : {info?.subregion || "-"}</div>
                                <div>Start of Week : {info?.startOfWeek || "-"}</div>
                                <div>Lanlocked : {info?.lanlocked === true ? "yes" : "no"}</div>
                                <div>Steering Path : {info?.car?.side || "-"}</div>
                                <div>About Flag : {info?.flags?.alt || "-"}</div>
                                <div>Status : {info?.independent === true ? "Independent" : "Dependent"}</div>
                                <div>Population : {info?.population || "-"}</div>
                                {info?.coatOfArms?.png ? 
                                    <div className="coat-of-arms">
                                        <img src={info?.coatOfArms?.png} alt={info?.name?.common}/>
                                    </div> : null
                                }
                            </div>
                            <div className="inform-2">
                                <div>Name : {info?.name?.common || "-"}</div>
                                <div>Code : {info?.altSpellings[0]}</div>
                                <div>Official Name : {info?.name?.official || "-"}</div>
                                <div>Rus : {info?.translations?.rus?.official || "-"}</div>
                                <div>Ara : {info?.translations?.ara?.official || "-"}</div>
                                <div>Bre : {info?.translations?.bre?.official || "-"}</div>
                                <div>Ces : {info?.translations?.ces?.official || "-"}</div>
                                <div>Ita : {info?.translations?.ita?.official || "-"}</div>
                                <div>Spa : {info?.translations?.spa?.official || "-"}</div>
                                <div>Jpn : {info?.translations?.jpn?.official || "-"}</div>
                                <div>Kor : {info?.translations?.kor?.official || "-"}</div>
                                <div>Hrv : {info?.translations?.hrv?.official || "-"}</div>
                                <div>Swe : {info?.translations?.swe?.official || "-"}</div>
                            </div>
                            <div className="inform-3">
                                <div className="timezone">Timezones : {info?.timezones.map((timezone, index) => (
                                    <div key={`timezone-${info?.name?.common}-${index}`}>{timezone}</div>
                                )) || "-"}</div>
                                <div className="border">
                                    Borders : {info ? info.borders?.map((border, index) => (
                                    <div key={`ccountry-border-${index}`}>{border}</div>
                                )) : "-"}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Footer/>
        </Fragment>
    )
}
