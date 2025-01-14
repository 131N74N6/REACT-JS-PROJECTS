import { Fragment, useMemo } from 'react';
import { useLocation } from "react-router-dom";
import Header from '../Components/Header';
import { useQuery } from "@tanstack/react-query";
import CountryData from '../Data/CountryData';
import CountryCard from '../Components/CountryCard';
import Loading from '../Utilities/Loading';
import ErrorMessage from '../Utilities/ErrorMessage';
import "./SearchResult.css";

export default function SearchResult() {
    const location = useLocation();
    const getParam = new URLSearchParams(location.search);
    const getData = getParam.get("s");

    const { data: searchedCountry, isLoading, error } = useQuery({
        queryKey: useMemo(() => ["search-country", getData], [getData]),
        queryFn: async () => await CountryData(
            `https://restcountries.com/v3.1/name/${getData}`, `No Result For ${getData}`
        ),
        staleTime: 5000,
        cacheTime: 1000 * 60 * 5
    });

    return (
        <Fragment>
            <Header page={2} />
            <div className="result-wrap">
                {isLoading ? <Loading /> :
                    error ? error.name === "TypeError" && error.message === "Failed to fetch" ?
                    <ErrorMessage message={"Check Your Internet Connection"}/> :
                    <ErrorMessage message={error.message}/> :
                    <div>
                        <div className="indicator">Result for "{getData}"</div>
                        <div className="result-content">
                            <CountryCard data={searchedCountry} dataKey="searched-country" />
                        </div> 
                    </div>
                }
            </div>
        </Fragment>
    )
}
