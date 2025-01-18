import Swal from "sweetalert";

export default function clearAllData(savedData, setSavedData, localStorage) {
    if (savedData.data.length > 0) {
        Swal({
            title: "kamu ingin menghapus seluruh data ?",
            text: "data akan hilang setelah dihapus!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                Swal("penghapusan berhasil", {
                    icon: "success",
                });
                setSavedData({ data: [], total: 0 });
                localStorage.removeItem("user-data");
            }
            else {
                Swal("batal dihapus");
            }
        })
    }
    else {
        Swal("", "kamu belum menambahkan satu data pun", "error");
    }
}
