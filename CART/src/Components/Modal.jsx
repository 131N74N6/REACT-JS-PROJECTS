import "./Modal.css";

export default function Modal({ isShow, text, onClick }) {
    return (
        <div className={isShow ? "modal-active" : "modal"}>
            <div className="message">{text}</div>
            <button type="button" onClick={onClick}>Close</button>
        </div>
    )
}
