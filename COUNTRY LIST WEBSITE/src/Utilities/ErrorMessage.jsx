import { Fragment } from 'react';
import "./ErrorMessage.css";

export default function ErrorMessage({message}) {
    return (
        <Fragment>
            <div className="error-msg">{message}</div>
        </Fragment>
    )
}
