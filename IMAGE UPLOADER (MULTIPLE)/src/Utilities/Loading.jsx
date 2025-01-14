import { Fragment } from 'react';
import "./Loading.css";

export default function Loading() {
    return (
        <Fragment>
            <div className="loading">
                <i className="fa-solid fa-arrows-rotate"></i>
            </div>
        </Fragment>
    )
}
