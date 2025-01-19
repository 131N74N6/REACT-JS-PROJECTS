import { useMemo, useState } from "react";
import Header from "../Components/Header";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import "./V6Calculator.css";
import { useCallback } from "react";

export default function V6Calculator() {
    const [ipV6, setIpV6] = useState({
        firstSlot: "", secondSlot: "", thirdSlot: "", fourthSlot: "", 
        fifthSlot: "", sixthSlot: "", seventhSlot: "", eighthSlot: ""
    });
    const [result, setResult] = useState({
        decimalIpNetwork: "",
        hexaIpNetwork: "",
        binaryIpNetwork: ""
    });
    const [showResult, setShowResult] = useState(false);

    const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setIpV6((ip) => { return { ...ip, [name]: value } } );
    }

    const v6ToOther = useMemo(() => {
        const { 
            firstSlot, secondSlot, thirdSlot, fourthSlot, 
            fifthSlot, sixthSlot, seventhSlot, eighthSlot 
        } = ipV6;

        const firstHexa = Number(firstSlot).toString(16).toUpperCase();
        const secondHexa = Number(secondSlot).toString(16).toUpperCase();
        const thirdHexa = Number(thirdSlot).toString(16).toUpperCase();
        const fourthHexa = Number(fourthSlot).toString(16).toUpperCase();
        const fifthHexa = Number(fifthSlot).toString(16).toUpperCase();
        const sixthHexa = Number(sixthSlot).toString(16).toUpperCase();
        const seventhHexa = Number(seventhSlot).toString(16).toUpperCase();
        const eighthHexa = Number(eighthSlot).toString(16).toUpperCase();

        const firstBinary = Number(firstSlot).toString(2).padStart(8,0);
        const secondBinary = Number(secondSlot).toString(2).padStart(8,0);
        const thirdBinary = Number(thirdSlot).toString(2).padStart(8,0);
        const fourthBinary = Number(fourthSlot).toString(2).padStart(8,0);
        const fifthBinary = Number(fifthSlot).toString(2).padStart(8,0);
        const sixthBinary = Number(sixthSlot).toString(2).padStart(8,0);
        const seventhBinary = Number(seventhSlot).toString(2).padStart(8,0);
        const eighthBinary = Number(eighthSlot).toString(2).padStart(8,0);

        const decimal = `${firstSlot}.${secondSlot}.${thirdSlot}.${fourthSlot}.
        ${fifthSlot}.${sixthSlot}.${seventhSlot}.${eighthSlot}`;

        const hexa = `${firstHexa}.${secondHexa}.${thirdHexa}.${fourthHexa}.${fifthHexa}.
        ${sixthHexa}.${seventhHexa}.${eighthHexa}`;

        const binary = `${firstBinary}.${secondBinary}.${thirdBinary}.${fourthBinary}.
        ${fifthBinary}.${sixthBinary}.${seventhBinary}.${eighthBinary}`;

        return { decimal, hexa, binary }
    }, [ipV6]);

    const resetAct = useCallback(() => {
        setShowResult(false);
        setResult({
            decimalIpNetwork: "",
            hexaIpNetwork: "",
            binaryIpNetwork: "",
        });
    }, [ipV6])

    const changeIpType = useCallback((event) => {
        event.preventDefault();
        const { 
            firstSlot, secondSlot, thirdSlot, fourthSlot, 
            fifthSlot, sixthSlot, seventhSlot, eighthSlot 
        } = ipV6;

        const v6Component = [
            firstSlot, secondSlot, thirdSlot, fourthSlot, 
            fifthSlot, sixthSlot, seventhSlot, eighthSlot
        ];

        if (v6Component.some(v6 => v6 === "" || isNaN(v6))) {
            alert("Semua input harus diisi dengan angka valid.");
            return;
        }

        if (v6Component.every(v6 => v6 >= 0 && v6 < 65536 )) {
            setShowResult(true);
            setIpV6({
                firstSlot: "", secondSlot: "", thirdSlot: "", fourthSlot: "", 
                fifthSlot: "", sixthSlot: "", seventhSlot: "", eighthSlot: ""
            });
            setResult({
                decimalIpNetwork: v6ToOther.decimal,
                hexaIpNetwork: v6ToOther.hexa,
                binaryIpNetwork: v6ToOther.binary
            });
        }
        else {
            alert("Please enter the valid ip");
        }
    }, [ipV6]);

    return (
        <div className="v6">
            <Header/>
            <div className="v6-body">
                <form title="ip-calculator-v6">
                    <InputField
                        id={"slot-1"} name={"firstSlot"} placeholder={"enter numbers..."}
                        type={"text"} length={5} onChange={handleInputs} value={ipV6.firstSlot}
                    />
                    <InputField
                        id={"slot-2"} name={"secondSlot"} placeholder={"enter numbers..."}
                        type={"text"} length={5} onChange={handleInputs} value={ipV6.secondSlot}
                    />
                    <InputField
                        id={"slot-3"} name={"thirdSlot"} placeholder={"enter numbers..."}
                        type={"text"} length={5} onChange={handleInputs} value={ipV6.thirdSlot}
                    />
                    <InputField
                        id={"slot-4"} name={"fourthSlot"} placeholder={"enter numbers..."}
                        type={"text"} length={5} onChange={handleInputs} value={ipV6.fourthSlot}
                    />
                    <InputField
                        id={"slot-5"} name={"fifthSlot"} placeholder={"enter numbers..."}
                        type={"text"} length={5} onChange={handleInputs} value={ipV6.fifthSlot}
                    />
                    <InputField
                        id={"slot-6"} name={"sixthSlot"} placeholder={"enter numbers..."}
                        type={"text"} length={5} onChange={handleInputs} value={ipV6.sixthSlot}
                    />
                    <InputField
                        id={"slot-7"} name={"seventhSlot"} placeholder={"enter numbers..."}
                        type={"text"} length={5} onChange={handleInputs} value={ipV6.seventhSlot}
                    />
                    <InputField
                        id={"slot-8"} name={"eighthSlot"} placeholder={"enter numbers..."}
                        type={"text"} length={5} onChange={handleInputs} value={ipV6.eighthSlot}
                    />
                    <Button 
                        text={"Calculate"} type={"submit"} className={"v6-submit"} 
                        onClick={changeIpType}
                    />
                    <Button 
                        text={"Reset"} type={"button"} className={"v6-reset"} 
                        onClick={resetAct}
                    />
                </form>
                {showResult === true ?
                    <div className="v6-result">
                        <div>Decimal IP : {result.decimalIpNetwork}</div>
                        <div>Hexa IP : {result.hexaIpNetwork}</div>
                        <div>Binary Ip : {result.binaryIpNetwork}</div>
                    </div> : <div className="v6-result">Enter the IP</div>
                }
            </div>
        </div>
    )
}
