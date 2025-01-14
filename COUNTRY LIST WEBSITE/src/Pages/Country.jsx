import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Country.css";
import Header from "../Components/Header";
import CountryCard from "../Components/CountryCard";
import Footer from "../Components/Footer";
import CountryData from "../Data/CountryData";
import Loading from "../Utilities/Loading";
import ErrorMessage from "../Utilities/ErrorMessage";

export default function Country() {
    const { data: countryData, isLoading, error } = useQuery({
        queryKey: ['all-country-data'], 
        queryFn: async () => await CountryData(
            "https://restcountries.com/v3.1/all", "Check Your Internet Connection"
        ),
        staleTime: 1000 * 60 * 3,
        cacheTime: 1000 * 60 * 5
    });

    const ascSort = countryData ? countryData?.sort((a,b) => a.name.common.localeCompare(b.name.common)) : [];
    const [filter, setFilter] = useState(ascSort);

    useEffect(() => {
        setFilter(ascSort);
    }, [countryData]);

    function regionFilter(event) {
        const selected = event.target.value;
        switch(selected) {
            case "Antarctic":
                setFilter(countryData?.filter((data) => data.region.includes("Antarctic")));
                break;
            case "Asia":
                setFilter(countryData?.filter((data) => data.region.includes("Asia")));
                break;
            case "Americas":
                setFilter(countryData?.filter((data) => data.region.includes("Americas")));
                break;
            case "Oceania":
                setFilter(countryData?.filter((data) => data.region.includes("Oceania")));
                break;
            case "Africa":
                setFilter(countryData?.filter((data) => data.region.includes("Africa")));
                break;
            case "Europe":
                setFilter(countryData?.filter((data) => data.region.includes("Europe")));
                break;
            default:
                setFilter(ascSort);
                break;
        }
    }

    return (
        <Fragment>
            <Header page={1}/>
            <div className="all-countries">
                <div className="filter">
                    <select onChange={regionFilter} name="region-filter" title="region-filter">
                        <option>All</option>
                        <option value="Asia">Asia</option>
                        <option value="Americas">Americas</option>
                        <option value="Antarctic">Antarctic</option>
                        <option value="Africa">Africa</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
                <div className="all-countries-wrap">
                    <div className="all-countries-content">
                        {isLoading ? <Loading/> :
                            error ? <ErrorMessage message={error.message}/> : 
                            <CountryCard data={filter} dataKey={"data-country"}/>
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </Fragment>
    )
}