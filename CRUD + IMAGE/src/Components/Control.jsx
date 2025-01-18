export default function Control({ openModal, deleteAllData, sortByName1, sortByName2, total }) {
    return (
        <div className="control">
            <button type="button" onClick={openModal}>add data</button>
            <button type="button" onClick={deleteAllData}>clear all</button>
            <button type="button" onClick={() => sortByName1()}>A-Z</button>
            <button type="button" onClick={() => sortByName2()}>Z-A</button>
            <div style={{fontFamily:'Calibri',fontSize:'20px'}}>{total} data added</div>
        </div>
    )
}
