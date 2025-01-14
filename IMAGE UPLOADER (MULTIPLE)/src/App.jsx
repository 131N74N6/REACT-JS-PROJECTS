import { Fragment, useReducer, useRef } from 'react';
import "./App.css";
import Swal from "sweetalert";
import Toggle from './Utilities/Toggle';
import Loading from './Utilities/Loading';

export default function App() {
    const defaultValue = {
        image: [], preview: [], imgData: [], isUpload: false, isLoading: false
    }

    const addButtonRef = useRef();
    const deleteRef = useRef();
    const imageRef = useRef();

    function option(state, action) {
        switch (action.type) {
            case "set image":
                return { ...state, image: [...state.image, action.payload] };
            case "set preview":
                return { ...state, preview: [...state.preview, action.payload] };
            case "set data":
                return { ...state, imgData: [...state.imgData, action.payload] };
            case "remove in preview":
                return { ...state, preview: state.preview.filter((_,i) => i !== action.payload) };
            case "remove one": 
                return { ...state, imgData: state.imgData.filter((_,i) => i !== action.payload) };
            case "clear all":
                return { ...state, imgData: [] };
            case "reset":
                return { ...state, image: [], preview: [] };
            case "show upload form":
                return { ...state, isUpload: action.payload };
            case "loading":
                return { ...state, isLoading: action.payload };
            default:
                return state;
        }
    }

    const [state, update] = useReducer(option, defaultValue);

    // UX style effect
    function showUploader() {
        update({ type: "show upload form", payload: true });
        addButtonRef.current.style.display = "none";
        deleteRef.current.style.display = "none";
    }

    // UX style effect
    function closeUploader() {
        update({ type: "show upload form", payload: false });
        addButtonRef.current.style.display = "inline-block";
        deleteRef.current.style.display = "inline-block";
    }

    // Berjalan secara asinkron
    async function imageUpload(event) {
        const files = Array.from(event.target.files);
        const allowType = ["image/jpg", "image/jpeg", "image/png"];

        // Memunculkan efek loading
        update({ type: "loading", payload: true });

        // Menggunakan Promise.all untuk memastikan semua proses selesai sebelum melanjutkan
        const promises = files.map(file => {
            return new Promise((resolve, reject) => {
                if (allowType.includes(file.type)) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        update({ type: "set image", payload: file });
                        update({ type: "set preview", payload: reader.result });
                        resolve();
                    }
                    reader.readAsDataURL(file);
                } 
                else {
                    Swal("", "Hanya menerima gambar dengan format JPG, JPEG, atau PNG", "warning");
                    reject();
                }
            });
        });

        // Tunggu semua file selesai di-load
        await Promise.all(promises);

        // Matikan efek loading
        update({ type: "loading", payload: false });
    }

    function trigger() {
        imageRef.current.click();
    }

    function resetFileInput() {
        imageRef.current.value = "";
    }

    function addImages(event) {
        event.preventDefault();
        update({ type: "loading", payload: true });

        // Validasi apakah ada gambar
        if (state.image.length > 0) {
            // Tambahkan semua preview yang ada ke dalam imgData
            state.preview.forEach((src, index) => {
                update({ type: "set data", payload: { src, name: state.image[index]?.name || `image-${index}` } });
            });
    
            // Reset state setelah menambahkan gambar
            update({ type: "reset" });
    
            // Menutup form
            update({ type: "show upload form", payload: false });
    
            // Menampilkan tombol
            addButtonRef.current.style.display = "inline-block";
            deleteRef.current.style.display = "inline-block";
    
            // Memunculkan notifikasi
            Swal("", "Gambar berhasil diunggah", "success");
        }
        else {
            Swal("", "pilih gambar yang ingin di unggah", "warning");
        }
        update({ type: "loading", payload: false });
    }

    // Menghapus salah satu gambar 
    function removeOne(index) {
        update({ type: "remove in preview", payload: index });
        resetFileInput();
    }

    function removeOneImage(index) {
        Swal({
            title: "ingin menghapus gambar ini ?",
            text: "gambar akan lenyap secara permanen",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                update({ type: "remove one", payload: index });
                Swal("","berhasil dihapus","success");
                resetFileInput();
            }
            else {
                Swal("penghapusan dibatalkan");
            }
        })
    }

    // Menghapus seluruh gambar
    function eraseAllImages() {
        if (state.imgData.length === 0) {
            Swal("","tidak ada satu pun gambar yamg di unggah","warning");
        }
        else {
            Swal({
                title: "yakin ingin menghapus seluruh gambar ?",
                text: "gambar tidak dapat dikembalikan",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    Swal("","berhasil dikosongkan","success" );
                    update({ type: "clear all" });
                }
                else {
                    Swal("penghapusan dibatalkan");
                }
            })
        }
    }

    // Menampilkan Gambar
    return (
        <Fragment>
            <div className="multiple-upload">
                <div className="control-panel-uploader">
                    <div className="button" onClick={eraseAllImages} ref={deleteRef}>Delete All</div>
                    <div className="button" onClick={showUploader} ref={addButtonRef}>Add Image</div>
                    <Toggle/>
                </div>
                {state.isUpload === true && (
                    <form name="uploader-field" title="uploader-field">
                        <input type="file" onChange={imageUpload} ref={imageRef} multiple style={{ display: "none" }} 
                        title="uploader" />
                        <div className="upload-sign-wrap">
                            <div className="upload-sign" onClick={trigger}>
                                <div className="upload-icon"><i className="fa-solid fa-upload"></i></div>
                                <div>Click here to upload your image</div>
                            </div>
                        </div>
                        <div className="show-img">
                            {state.isLoading === true ? <Loading/> :
                                state.preview.length > 0 ? (
                                state.preview.map((src, index) => (
                                    <div key={`preview-${index}`} className="img-size">
                                        <img src={src} alt={state.image[index]?.name || `image-${index}`} 
                                        onClick={() => removeOne(index)} />
                                    </div>
                                ))
                            ) : (
                                <div className="message">No Chosen Images</div>
                            )}
                        </div>
                        <div className="upload-option">
                            <div className="button" onClick={addImages}>Upload</div>
                            <div className="button" onClick={closeUploader}>Close</div>
                        </div>
                    </form>
                )}
                <div className="shown">
                    <div className="shown-content">
                        {state.imgData.length > 0 ? (
                            state.imgData.map((image, index) => (
                                <div key={`uploaded-${index}`} className="uploaded-img">
                                    <img src={image.src} alt={image.name} />
                                    <button type="button" onClick={() => removeOneImage(index)}>🗑️</button>
                                </div>
                            ))
                        ) : (
                            state.isLoading === true ? <Loading/> : 
                            <div>No Uploaded Image</div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
