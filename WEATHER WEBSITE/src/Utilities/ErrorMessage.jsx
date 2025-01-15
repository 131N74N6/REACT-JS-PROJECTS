import { Fragment } from "react";
import "./ErrorMessage.css";

export default function ErrorMessage({message}) {
    const errorImg = "https://i.pinimg.com/originals/6b/56/a8/6b56a8f997240aa12424e74f8c4ff957.jpg";

    return (
        <Fragment>
            <div className="error-wrap d-flex">
                <div className="error-content">
                    <div className="error-message text-center">{message}</div>
                    <div className="error-img-wrap">
                        <img src={errorImg} width={250} height={250} alt="sorry" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
