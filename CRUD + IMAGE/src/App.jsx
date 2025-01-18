import { useCallback, useRef, useState } from "react";
import Swal from "sweetalert";

import UpdateFields from "./Components/UpdateFields";
import InputFields from "./Components/InputFields";
import ShowData from "./Components/ShowData";
import Control from "./Components/Control";

import submitData from "./Helpers/submitData";
import removeOne from "./Helpers/removeOne";
import clearAllData from "./Helpers/clearAllData";
import updateData from "./Helpers/updateData";
import dataSorting from "./Helpers/dataSorting";
import "./App.css";

const backUp = localStorage.getItem("user-data");
// JSON.parse(backUp) || 

export default function SimpleRegister() {
    const [inputData, setInputData] = useState({ name: "", age: "", address: "", gender: "" });
    const [savedData, setSavedData] = useState({ data: JSON.parse(backUp) || [], total: 0 });
    const [show, setShow] = useState({ isFormOpen: false, isUpdateOpen: false });
    const [imageFile, setImageFile] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const selectData = useRef(); //menyimpan data yang dipilih
    const imageRef = useRef(); //input file

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputData((input) => { return { ...input, [name]: value } });
    }

    //menampilkan file gambar
    function setImage(event) {
        const getFile = event.target.files[0];
        const imgType = ["image/jpg", "image/jpeg", "image/png"];
        
        // Validasi tipe file
        if (getFile && imgType.includes(getFile.type)) {
            setImageFile(getFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            }
            reader.readAsDataURL(getFile);
        } 
        else {
            Swal("", "Hanya menerima gambar tipe jpg, jpeg, dan png", "warning");
            setImageFile("");
        }
    }

    const openModal = useCallback(() => {
        setShow({ isFormOpen: true, isUpdateOpen: false });
    }, []);

    function setPreview() {
        imageRef.current.click();
    }

    //menambahkan data ke array (database)
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        submitData(
            imageFile, previewImage, savedData, inputData, setSavedData, 
            setInputData, setImageFile, setShow, localStorage
        );
    }, [inputData, imageFile, previewImage, savedData]);

    const cancelSubmit = useCallback(() => {
        setInputData({ name: "", age: "", address: "", gender: ""  });
        setImageFile("");
        setShow({ isFormOpen: false, isUpdateOpen: false });
        if (imageRef.current) imageRef.current.value = "";
    }, []);

    // menghapus salah satu data
    const deleteData = useCallback((index) => {
        removeOne(savedData, setSavedData, index, localStorage);
    }, [savedData]);

    // menghapus semua data
    const deleteAllData = useCallback(() => {
        clearAllData(savedData, setSavedData, localStorage);
    }, [savedData]);

    // memilih salah satu data yang akan dirubah
    const selectedData = useCallback((index) => {
        selectData.current = index;
        setShow({ isFormOpen: false, isUpdateOpen: true });
        setInputData({
            name: savedData.data[selectData.current].name,
            age: savedData.data[selectData.current].age,
            gender: savedData.data[selectData.current].gender,
            address: savedData.data[selectData.current].address
        });
        setPreviewImage(savedData.data[selectData.current].profile);
    }, [inputData, show, previewImage]);

    // merubah salah satu data yang dipilih
    const handleUpdate = useCallback((event) => {
        event.preventDefault();
        updateData(
            savedData, inputData, selectData, previewImage, 
            setSavedData, setInputData, setImageFile, setShow, localStorage
        );
    }, [imageFile, inputData, selectData, previewImage]);

    const cancelUpdate = useCallback(() => {
        setShow({ isFormOpen: false, isUpdateOpen: false });
        setInputData({ name: "", age: "", address: "", gender: ""  });
        setImageFile("");
        if (imageRef.current) imageRef.current.value = "";
    }, []);

    // mengurutkan dari kecil ke besar
    const sortByName1 = useCallback(() => {
        dataSorting(savedData.data, setSavedData, "ascend sort", localStorage);
    }, [savedData]);

    // mengurutkan dari besar ke kecil
    const sortByName2 = useCallback(() => {
        dataSorting(savedData.data, setSavedData, "descend sort", localStorage);
    }, [savedData]);

    return (
        <div className="field-2">
            <div className="form-and-update">
                <Control 
                    openModal={openModal} 
                    deleteAllData={deleteAllData} 
                    sortByName1={sortByName1} 
                    sortByName2={sortByName2}
                    total={savedData.data.length}
                />
                <InputFields
                    isModalOpen={show.isFormOpen}
                    name={inputData.name} 
                    changeName={handleInput}
                    age={inputData.age} 
                    changeAge={handleInput}
                    address={inputData.address} 
                    changeAddress={handleInput}
                    gender={inputData.gender} 
                    changeGender={handleInput}
                    image={imageFile} 
                    changeImage={setImage}
                    preview={previewImage} 
                    changePreview={setPreview}
                    cancelSubmit={cancelSubmit} 
                    submitData={handleSubmit}
                    imageRef={imageRef}
                />
                <UpdateFields 
                    isUpdateOpen={show.isUpdateOpen}
                    name={inputData.name} 
                    handleName={handleInput} 
                    age={inputData.age} 
                    handleAge={handleInput} 
                    address={inputData.address} 
                    handleAddress={handleInput} 
                    gender={inputData.gender} 
                    handleGender={handleInput} 
                    refr={imageRef} 
                    profile={previewImage} 
                    handleImage={setImage} 
                    edit={handleUpdate} 
                    handlePreview={setPreview} 
                    close={cancelUpdate}
                />
            </div>
            <ShowData 
                data={savedData.data} 
                selectedData={selectedData} 
                deleteData={deleteData}
            />
        </div>
    )
}
