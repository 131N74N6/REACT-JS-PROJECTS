import { Fragment, useRef } from "react";
import "./Header.css";
import Swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "../Utilities/DarkMode";

export default function Header() {
    const getLocationName = useRef();
    const moveTo = useNavigate();

    function getData(event) {
        event.preventDefault();
        const keyword = getLocationName.current.value;
        const allowChar = /^[a-zA-Z ]+$/;

        if (keyword.trim() === "" && !allowChar.test(keyword.trim())) {
            Swal("", "Please enter the valid city name", "warning");
        } 
        else {
            moveTo(`/weather-info?q=${encodeURIComponent(keyword.trim())}`)
        }
    }

    return (
        <Fragment>
            <header className="app-header">
                <form className="set-city" name="set-city" onSubmit={getData} title="set-city">
                    <Link to="/">Back</Link>
                    <input type="search" required ref={getLocationName} placeholder="enter city name..." 
                    className="city-name" aria-label="nama-kota" name="nama-kota"/>
                    <button type="submit" className="get-weather-data">Find It</button>
                    <DarkMode/>
                </form>
            </header>
        </Fragment>
    )
}
