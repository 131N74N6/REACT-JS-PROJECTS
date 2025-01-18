import Swal from "sweetalert";

export default function updateData(
    savedData, inputData, selectData, previewImage, setSavedData, 
    setInputData, setImageFile, setShow, localStorage
) {
    // data
    const dataCopy = [...savedData.data];
    const newData = {
        name: inputData.name, age: inputData.age, gender: inputData.gender,
        address: inputData.address, profile: previewImage
    }

    //reg ex filter karakter
    const select1 = /^[a-zA-Z ]+$/;
    const select2 = /^[a-zA-Z 0-9-]+$/;

    // persyaratan
    const firstReq = selectData.current !== null && selectData.current !== undefined;
    const reqName = inputData.name.trim() !== "" && select1.test(inputData.name);
    const reqAge = !isNaN(Number(inputData.age)) && Number(inputData.age) > 0;
    const reqGender = (inputData.gender.toLowerCase() === "male" || inputData.gender.toLowerCase() === "female");
    const reqAddress = inputData.address.trim() !== "" && select2.test(inputData.address);

    if (firstReq && savedData.data[selectData.current] !== undefined) {
        if (reqName && reqAge && reqGender && reqAddress) {
            const isDataDifferent = dataCopy[selectData.current].name !== inputData.name ||
                dataCopy[selectData.current].age !== inputData.age ||
                dataCopy[selectData.current].gender !== inputData.gender ||
                dataCopy[selectData.current].address !== inputData.address ||
                dataCopy[selectData.current].profile !== previewImage;
            if (isDataDifferent) {
                dataCopy[selectData.current] = newData;
                setSavedData({ data: dataCopy, total: dataCopy.length });
                setInputData({ name: "", age: "", address: "", gender: "" });
                setImageFile("");
                setShow({ isFormOpen: false, isUpdateOpen: false });
                Swal("", "Data berhasil dirubah", "success");
                localStorage.setItem("user-data", JSON.stringify(dataCopy));
            } 
            else {
                Swal("","data sudah ada","error");
            }
        }
        else {
            Swal("","isi data dengan benar","error");
        }
    }
    else {
        Swal("","kamu belum menambahkan data","error");
        setShow({ isFormOpen: false, isUpdateOpen: false });
    }
}
