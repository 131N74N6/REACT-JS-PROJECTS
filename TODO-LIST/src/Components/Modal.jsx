export default function Modal({ getData, handleData, update, cancel }) {
    return (
        <div>
            <input type="text" id="list-input" value={getData} onChange={handleData} 
            placeholder="masukkan aktivitas..." />
            <button type="submit" onClick={update} id="edit-btn">Update</button>
            <button type="button" onClick={cancel} className="cancel-btn">Cancel</button>
        </div>
    )
}
