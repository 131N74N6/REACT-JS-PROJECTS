import { Fragment, useEffect, useState } from "react";
import "./DarkMode.css";

export default function DarkMode() {
    const [isDark, setIsDark] = useState(localStorage.getItem("page-theme") === "dark");

    function darkMode() {
        document.querySelector("body").setAttribute("page-theme", "dark");
        localStorage.setItem("page-theme", "dark");
    }
    
    function lightMode() {
        document.querySelector("body").setAttribute("page-theme", "light");
        localStorage.setItem("page-theme", "light");
    }

    function changeTheme(event) {
        const picked = event.target.checked;
        setIsDark(picked);
    }

    useEffect(() => {
        isDark ? darkMode() : lightMode();
    }, [isDark]);

    return (
        <Fragment>
            <input type="checkbox" id="theme-changer" onChange={changeTheme} checked={isDark} title="theme-changer"/>
            <label htmlFor="theme-changer"></label>
        </Fragment>
    )
}
