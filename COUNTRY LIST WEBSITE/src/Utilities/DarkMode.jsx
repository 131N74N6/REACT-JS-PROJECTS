import { Fragment, useEffect, useState } from 'react';
import "./DarkMode.css";

export default function DarkMode() {
    const [isDark, setIsDark] = useState(localStorage.getItem("web-theme") === "dark");

    function setDarkMode() {
        document.querySelector("body").setAttribute("web-theme","dark");
        localStorage.setItem("web-theme","dark");
    }

    function setLightMode() {
        document.querySelector("body").setAttribute("web-theme","light");
        localStorage.setItem("web-theme","light");
    }

    function changeTheme(event) {
        const pickedTheme = event.target.checked;
        setIsDark(pickedTheme);
    }

    useEffect(() => {
        isDark ? setDarkMode() : setLightMode()
    }, [isDark]);

    return (
        <Fragment>
            <input type="checkbox" id="toggle-theme" onChange={changeTheme} checked={isDark}/>
            <label htmlFor='toggle-theme'>
                <i className="fa-solid fa-sun"></i>
                <i className="fa-solid fa-moon"></i>
            </label>
        </Fragment>
    )
}
