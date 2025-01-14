import { Fragment, useContext } from 'react';
import { Link } from "react-router-dom";
import "./CountryCard.css";

export default function CountryCard({data, dataKey}) {
    return (
        <Fragment>
            {data?.map((d, index) => (
                <Link to={`/detail/${d.name.common}`} key={`${dataKey}-${index}`} className="country-card">
                    <div className="flag-fit">
                        <img src={d.flags.png} alt={d.name.common}/>
                    </div>
                    <h5>Name : {d.name.common}</h5>
                    <h5>Population : {d.population}</h5>
                    <h5>Status : {d.independent === true ? "Independent" : "Dependent"}</h5>
                    <h5>Capital : {d.capital}</h5>
                </Link>
            ))}
        </Fragment>
    )
}
