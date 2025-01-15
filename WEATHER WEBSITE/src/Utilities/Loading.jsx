import { Fragment } from "react";
import "./Loading.css";

export default function Loading() {
    return (
        <Fragment>
            <div className="waiting-weather">
                <i className="fa-solid fa-rotate"></i>
            </div>
        </Fragment>
    )
}
