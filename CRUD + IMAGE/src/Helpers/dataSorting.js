import Swal from "sweetalert";

export default function dataSorting(data, setSavedData, type, localStorage) {
    if (data.length === 1) {
        Swal("","tambahkan 1 data lagi untuk menggunakan fitur ini");
    }
    else if (data.length > 1) {
        const dataCopy = [...data];
        const sorted = dataCopy.sort((a, b) => {
            if (type === "ascend sort") {
                return a.name.localeCompare(b.name);
            }
            else {
                return b.name.localeCompare(a.name);
            }
        });
        setSavedData({ data: sorted, total: sorted.length });
        localStorage.setItem("user-data", JSON.stringify(sorted));
    }
    else {
        Swal("","masih kosong");
    }
}
