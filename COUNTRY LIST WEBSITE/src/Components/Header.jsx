import { Fragment } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "../Utilities/DarkMode";

export default function Header({page}) {
    const navigate = useNavigate();
    
    function handleSearch(event) {
        event.preventDefault();
        const keyword = event.target.search.value;
        if (keyword.trim() !== "") {
            navigate(`/search?s=${encodeURIComponent(keyword.trim())}`);
        }
        else {
            alert("fuck you");
        }
    }

    if (page === 1) {
        return (
            <Fragment>
                <header className="header">
                    <div className="web-title">COUNTRIES.ALL</div>
                    <form onSubmit={handleSearch} name="header-form">
                        <input type="search" name="search" placeholder="enter country name..." required />
                        <button type="submit">Find it</button>
                        <DarkMode/>
                    </form>
                </header>
            </Fragment>
        )
    }

    else if (page === 2) {
        return (
            <Fragment>
                <header className="header">
                    <Link to={"/"}>⬅️</Link>
                    <div className="web-title">COUNTRIES.ALL</div>
                    <form onSubmit={handleSearch} name="header-form">
                        <input type="search" name="search" placeholder="enter country name..." required />
                        <button type="submit">Find it</button>
                        <DarkMode/>
                    </form>
                </header>
            </Fragment>
        )
    }

    else {
        return "";
    }
}
