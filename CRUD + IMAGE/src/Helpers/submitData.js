import Swal from "sweetalert";

export default function submitData(
    imageFile, previewImage, savedData, 
    inputData, setSavedData, setInputData, 
    setImageFile, setShow, localStorage
) {
    // penampungan data baru
    const newData = {
        name: inputData.name, age: inputData.age, address: inputData.address, 
        gender: inputData.gender, profile: previewImage
    }
    const currentData = [...savedData.data, newData];

    //reg ex filter karakter
    const select = /^[a-zA-Z ]+$/;
    const select2 = /^[a-zA-Z 0-9-]+$/;

    // persyaratan
    const imgType = ["image/jpg","image/jpeg","image/png"];
    const isExist = savedData.data.find((d) => { 
        return newData.name === d.name && newData.age === d.age && newData.gender === d.gender &&
        newData.address === d.address
    });
    const reqName = select.test(inputData.name) && inputData.name.trim() !== "";
    const reqAge = !isNaN(Number(inputData.age)) && Number(inputData.age) > 0;
    const reqGender = (inputData.gender.toLowerCase() === "male" || inputData.gender.toLowerCase() === "female");
    const reqAddress = inputData.address.trim() !== "" && select2.test(inputData.address);
    
    if (reqName && reqAge > 0 && reqGender && reqAddress && imageFile) {
        if (imgType.includes(imageFile.type)) {
            if (!isExist) {
                Swal("","data registrasi berhasil","success");
                setSavedData({ data: currentData, total: currentData.length });
                setInputData({ name: "", age: "", address: "", gender: ""  });
                setImageFile("");
                setShow({ isFormOpen: false, isUpdateOpen: false });
                localStorage.setItem("user-data", JSON.stringify(currentData));
            }
            else {
                setInputData({ name: "", age: "", address: "", gender: ""  });
                setImageFile("");
                setShow({ isFormOpen: false, isUpdateOpen: false });
                Swal("","data sudah ada","error");
            }
        }
        else {
            setInputData({ name: "", age: "", address: "", gender: ""  });
            setImageFile("");
            setShow({ isFormOpen: false, isUpdateOpen: false });
            Swal("","hanya menerima gambar tipe jpg, jpeg, dan png","error");
        }
    }
    else {
        Swal("","isi semua data dengan benar","error");
    }
}
