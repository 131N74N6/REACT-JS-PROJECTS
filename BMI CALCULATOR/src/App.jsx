import { useMemo, useState } from "react";
import "./App.css";

export default function App() {
    const [indicator, setIndicator] = useState({ height: "", weight: "" });
    const [hasil, setHasil] = useState("");

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setIndicator((indc) => { return { ...indc, [name]: value } });
    }

    const bmi = useMemo(() => {
        const height = Number(indicator.height);
        const weight = Number(indicator.weight);

        if (isNaN(height) || isNaN(weight)) {
            alert("Semua input harus diisi dengan angka valid.");
            return;
        }
        
        if (height && weight) {
            const ubahTinggiBadan = height / 100;
            return Math.round(weight / (ubahTinggiBadan ** 2));
        }
        else {
            alert("Masukkan data yang valid");
            return;
        }
    }, [indicator]);

    function bmiStatus(event) {
        event.preventDefault();
        if (bmi !== null) {
            if (bmi >= 30 ) {
                setHasil(`Hasil bmi kamu adalah ${bmi}. Status : Obesitas`);
            }
            else if (bmi >= 25 && bmi <= 29.5) {
                setHasil(`Hasil bmi kamu adalah ${bmi}. Status : Berlebihan`);
            }
            else if (bmi >= 18.5 && bmi <= 24.9) {
                setHasil(`Hasil bmi kamu adalah ${bmi}. Status : Normal`);
            }
            else {
                setHasil(`Hasil bmi kamu adalah ${bmi}. Status : Kurang Normal`);
            }
        }
        else {
            setHasil("Masukkan tinggi badan dan berat badan dulu");
        }
    }

    function resetOperation() {
        setWeight(parseInt(""));
        setHeight(parseInt(""));
        setHasil("");
    }

    return (
        <div className="bmi-wrap">
            <div className="bmi-calculator">
                <form title="bmi-calculator">
                    <div className="wrap-1">
                        <div className="judul-input">Berat Badan</div>
                        <input type="text" value={indicator.weight} id="weight" placeholder="masukkan berat badan..." 
                        onChange={handleInput} name="weight"/>
                    </div>
                    <div className="wrap-2">
                        <div className="judul-input">Tinggi Badan</div>
                        <input type="text" value={indicator.height} id="height" placeholder="masukkan tinggi badan..." 
                        onChange={handleInput} name="height"/>
                    </div>
                    <div className="bmi-control">
                        <button type="submit" onClick={bmiStatus}>Hitung</button>
                        <button type="button" onClick={resetOperation}>Reset</button>
                    </div>
                </form>
                <div className="bmi-result">
                    <div>{hasil}</div>
                </div>
            </div>
        </div>
    )
}
