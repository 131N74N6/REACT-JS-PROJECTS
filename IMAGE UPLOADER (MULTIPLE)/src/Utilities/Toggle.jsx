import { Fragment, useEffect, useState } from 'react';
import "./Toggle.css";

export default function Toggle() {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("page-theme") === "dark");
    
    function lightMode() {
        document.querySelector("body").setAttribute("page-theme", "light");
        localStorage.setItem("page-theme", "light");
    }

    function darkMode() {
        document.querySelector("body").setAttribute("page-theme", "dark");
        localStorage.setItem("page-theme", "dark");
    }

    function changeTheme(event) {
        const selected = event.target.checked;
        setIsDarkMode(selected);
    }

    useEffect(() => {
        if (isDarkMode) {
            darkMode();
        } 
        else {
            lightMode();
        }
    }, [isDarkMode]);

    return (
        <Fragment>
            <input type="checkbox" id="dark-theme" checked={isDarkMode} onChange={changeTheme}/>
            <label htmlFor="dark-theme"></label>
        </Fragment>
    )
}
