import { memo } from "react";

function ShowData({ data, selectedData, deleteData }) {
    return (
        <div className="submitted-data">
            <div className="show-data">
                {data.length > 0 ? (
                    data.map((dt, index) => (
                    <div key={`data-${index}`} className="data-id">
                        <div className="img-container">
                            <img src={dt.profile} alt={dt.name} />
                        </div>
                        <p>name : {dt.name}</p>
                        <p>age : {dt.age}</p>
                        <p>gender : {dt.gender}</p>
                        <p>address : {dt.address}</p>
                        <div className="data-handler">
                            <button type="button" onClick={() => selectedData(index)}>Select</button>
                            <button type="button" onClick={() => deleteData(index)}>Delete</button>
                        </div>
                    </div>
                ))) : (
                    <div className="submitted-data">
                        empty...
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(ShowData);