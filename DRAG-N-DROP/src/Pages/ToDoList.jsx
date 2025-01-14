import { useCallback, useState } from "react";
import ListField from "../Components/ListField";
import Notification from "../Components/Notification";
import "../Styles/ToDoList.css";

const storedData = localStorage.getItem("todo-list");

export default function ToDoList() {
    const [data, setData] = useState({ title: "", status: "", category: "" });
    const [list, setList] = useState(JSON.parse(storedData) || []);
    const [activeCard, setActiveCard] = useState(0);
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((d) => { return { ...d, [name]: value } });
    }

    const submitNewList = useCallback((event) => {
        event.preventDefault();
        const require1 = data.title.trim() !== "" && data.title !== null && data.title !== undefined;
        const require2 = data.category !== "...Pilih Kondisi..." && data.category.trim() !== "";
        const require3 = data.status !== "...Pilih Level..." && data.status.trim() !== "";
        const apakahAda = list.find((li) => { return li.title === data.title });

        if (require1 && require2 && require3) {
            if (!apakahAda) {
                const tambahkanId = { ...data, id: Date.now() }
                const updated = [...list, tambahkanId];
                setList([...updated]);
                setIsOpen(true);
                setMessage("list berhasil ditambahkan");
                setData({ title: "", status: "", category: "" });
                localStorage.setItem("todo-list", JSON.stringify(updated));
            }
            else {
                setIsOpen(true);
                setData({ title: "", status: "", category: "" });
                setMessage("list sudah ada");
            }
        }
        else {
            setIsOpen(true);
            setData({ title: "", status: "", category: "" });
            setMessage("ada yang kurang. benerin dulu deh");
        }
    }, [data, list]);

    const closeModal = () => {
        setIsOpen(false);
    }

    const deleteList = useCallback((id) => {
        const updated = list.filter((li) => li.id !== id);
        setList([...updated]);
        localStorage.setItem("todo-list", JSON.stringify(updated));
    }, [list]);
    
    const handleActiveCard = useCallback((id) => {
        setActiveCard(id);
    }, [list]);

    const deleteAll = () => {
        setList([]);
        setIsOpen(true);
        setMessage("daftar listmu sudah kosong");
        localStorage.removeItem("todo-list");
    }

    const handleDrag = useCallback((index, condition) => {
        if (!activeCard) return;

        // Cari item berdasarkan id
        const pindahkanKe = list.find((li) => li.id === activeCard);
        if (!pindahkanKe) {
            setMessage("Item tidak ditemukan");
            setIsOpen(true);
            return;
        }

        // Hapus item dari daftar
        const updated = list.filter((li) => li.id !== activeCard);

        // Tambahkan item ke posisi baru
        updated.splice(index, 0, { ...pindahkanKe, category: condition });
        setList(updated);
        localStorage.setItem("todo-list", JSON.stringify(updated));
    }, [activeCard, list]);

    return (
        <div className="dnd-2-wrap">
            <div className="dnd-2-body">
                <form title="drag-drop-2">
                    <input 
                        type="text" onChange={handleInputChange} 
                        value={data.title} id="enter-list" 
                        name="title"
                        placeholder="masukkan aktivitas"
                    />
                    <select onChange={handleInputChange} name="status" value={data.status} 
                    title="important-level">
                        <option>...Pilih Level...</option>
                        <option value="tidak penting">Tidak Penting</option>
                        <option value="penting">Penting</option>
                        <option value="sangat penting">Sangat Penting</option>
                    </select>
                    <select name="category" title="condition" onChange={handleInputChange} value={data.category}>
                        <option>...Pilih Kondisi...</option>
                        <option value="baru">Baru</option>
                        <option value="sedang dilakukan">Sedang Dilakukan</option>
                        <option value="selesai">Selesai</option>
                    </select>
                    <button type="submit" onClick={submitNewList}>Tambahkan List ➕</button>
                    <button type="button" onClick={deleteAll}>Hapus Semua 🗑️</button>
                </form>
            </div>
            <Notification open={isOpen} message={message} close={closeModal}/>
            <ListField 
                data={list} 
                eraser={deleteList} 
                activeCard={handleActiveCard} 
                dropHandling={handleDrag} 
                brightness={isOpen}
            />
        </div>
    )
}
