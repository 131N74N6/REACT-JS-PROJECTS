import { memo } from "react";

function Button({ text, type, className, onClick }) {
    return (
        <div>
            <button type={type} className={className} onClick={onClick}>{text}</button>
        </div>
    )
}

export default memo(Button);