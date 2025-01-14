import { Fragment } from 'react';
import "./Loading.css";

export default function Loading() {
    return (
        <Fragment>
            <div className="loading-wrap">
                <i className="fa-solid fa-rotate-right"></i>
            </div>
        </Fragment>
    )
}
