import Swal from "sweetalert";

export default function removeOne(savedData, setSavedData, index, localStorage) {
    Swal({
        title: "kamu ingin menghapus data ini ?",
        text: "data akan hilang setelah dihapus!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            Swal("data berhasil dihapus", {
                icon: "success",
            })
            const currentData = savedData.data.filter((_,i) => i !== index);
            setSavedData({ data: [...currentData], total: currentData.length });
            localStorage.setItem("user-data", JSON.stringify(currentData));
        }
        else {
            Swal("batal dihapus");
        }
    });
}
