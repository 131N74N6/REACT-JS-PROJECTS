import { useCallback, useMemo, useState } from "react";
import Header from "../Components/Header";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import "./V4Calculator.css";

export default function V4Calculator() {
    const [ipV4, setIpV4] = useState({ 
        firstSlot: "", 
        secondSlot: "", 
        thirdSlot: "", 
        fourthSlot: "", 
        netMask: "" 
    });
    const [attributes, setAttributes] = useState({ 
        ipNetwork: "", 
        firstHost: "", 
        lastHost: "", 
        ipBroadcast: "" 
    });
    const [results, setResults] = useState({
        binIpNetwork: "", 
        binFirstHost: "", 
        binLastHost: "", 
        binIpBroadcast: ""
    });
    const [showResult, setShowResult] = useState(false);

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setIpV4((ip) => { return { ...ip, [name]: value} } );
    }

    const result = useMemo(() => {
        const { firstSlot, secondSlot, thirdSlot, fourthSlot } = ipV4;

        const firstBin = Number(Number(firstSlot) >>> 0).toString(2).padStart(8, "0");
        const secondBin = Number(Number(secondSlot) >>> 0).toString(2).padStart(8, "0");
        const thirdBin = Number(Number(thirdSlot) >>> 0).toString(2).padStart(8, "0");
        const fourthBin = Number(Number(fourthSlot) >>> 0).toString(2).padStart(8, "0");

        const decimal = `${firstSlot}.${secondSlot}.${thirdSlot}.${fourthSlot}`;
        const binary = `${firstBin}.${secondBin}.${thirdBin}.${fourthBin}`;

        return { decimal, binary }

    }, [ipV4]);

    const decideAttributes = useCallback((event) => {
        event.preventDefault();
        const { firstSlot, secondSlot, thirdSlot, fourthSlot } = ipV4;
        const netMask = Number(ipV4.netMask); 
        const ipComponent = [firstSlot, secondSlot, thirdSlot, fourthSlot];
    
        if (ipComponent.some(ip => ip === "" || isNaN(ip)) || isNaN(netMask)) {
            alert("Semua input harus diisi dengan angka valid.");
            return;
        }
    
        if (ipComponent.every(ip => ip >= 0 && ip <= 255)) {
            setShowResult(true);
            if (netMask === 8) {
                setAttributes({ 
                    ipNetwork: `${firstSlot}.0.0.0`, 
                    firstHost: `${firstSlot}.0.0.1`,
                    lastHost: `${firstSlot}.255.255.254`,
                    ipBroadcast: `${firstSlot}.255.255.255`
                });
                setResults({
                    binIpNetwork: `${result.binary.slice(0, 8)}.00000000.00000000.00000000`,
                    binFirstHost: `${result.binary.slice(0, 8)}.00000000.00000000.00000001`,
                    binLastHost: `${result.binary.slice(0, 8)}.11111111.11111111.11111110`,
                    binIpBroadcast: `${result.binary.slice(0, 8)}.11111111.11111111.11111111`
                });
            } 
            else if (netMask === 16) {
                setAttributes({ 
                    ipNetwork: `${firstSlot}.${secondSlot}.0.0`, 
                    firstHost: `${firstSlot}.${secondSlot}.0.1`,
                    lastHost: `${firstSlot}.${secondSlot}.255.254`,
                    ipBroadcast: `${firstSlot}.${secondSlot}.255.255`
                });
                setResults({
                    binIpNetwork: `${result.binary.slice(0, 8)}.${result.binary.slice(9, 17)}.00000000.00000000`,
                    binFirstHost: `${result.binary.slice(0, 8)}.${result.binary.slice(9, 17)}.00000000.00000001`,
                    binLastHost: `${result.binary.slice(0, 8)}.${result.binary.slice(9, 17)}.11111111.11111110`,
                    binIpBroadcast: `${result.binary.slice(0, 8)}.${result.binary.slice(9, 17)}.11111111.11111111`
                });
            } 
            else if (netMask === 24) {
                setAttributes({ 
                    ipNetwork: `${firstSlot}.${secondSlot}.${thirdSlot}.0`, 
                    firstHost: `${firstSlot}.${secondSlot}.${thirdSlot}.1`,
                    lastHost: `${firstSlot}.${secondSlot}.${thirdSlot}.254`,
                    ipBroadcast: `${firstSlot}.${secondSlot}.${thirdSlot}.255`
                });
                setResults({
                    binIpNetwork: `${result.binary.slice(0, 8)}.${result.binary.slice(9, 17)}.${result.binary.slice(18, 26)}.00000000`,
                    binFirstHost: `${result.binary.slice(0, 8)}.${result.binary.slice(9, 17)}.${result.binary.slice(18, 26)}.00000001`,
                    binLastHost: `${result.binary.slice(0, 8)}.${result.binary.slice(9, 17)}.${result.binary.slice(18, 26)}.11111110`,
                    binIpBroadcast: `${result.binary.slice(0, 8)}.${result.binary.slice(9, 17)}.${result.binary.slice(18, 26)}.11111111`
                });
            } 
            else {
                alert("net-mask harus 8, 16, atau 24.");
                setShowResult(false);
            }
        } 
        else {
            alert("Nilai IP harus antara 0 hingga 255.");
            setShowResult(false);
        }
    }, [ipV4, result]);    

    return (
        <div className="v4">
            <Header/>
            <div className="v4-body">
                <form >
                    <InputField 
                        id={"first-slot"} name={"firstSlot"} type={"text"} 
                        length={3} onChange={handleInput} placeholder={"enter numbers ..."}
                    />
                    <InputField 
                        id={"second-slot"} name={"secondSlot"} type={"text"} 
                        length={3} onChange={handleInput} placeholder={"enter numbers ..."}
                    />
                    <InputField 
                        id={"third-slot"} name={"thirdSlot"} type={"text"} 
                        length={3}  onChange={handleInput} placeholder={"enter numbers ..."}
                    />
                    <InputField 
                        id={"fourth-slot"} name={"fourthSlot"} type={"text"} 
                        length={3}  onChange={handleInput} placeholder={"enter numbers ..."}
                    />
                    <InputField
                        id={"net-mask"} name={"netMask"} type={"text"}
                        placeholder={"enter net-mask ex 8,16,24"} length={2} onChange={handleInput}
                    />
                    <Button 
                        text={"Calculate"} type={"submit"} className={"v4-submit"} 
                        onClick={decideAttributes}
                    />
                </form>
                {showResult === true ? 
                    <div className="ip-result">
                        <div className="decimal-result">
                            <div>IP Network : {attributes.ipNetwork}</div>
                            <div>First Host : {attributes.firstHost}</div>
                            <div>Last Host : {attributes.lastHost}</div>
                            <div>IP Broadcast : {attributes.ipBroadcast}</div>
                        </div>
                        <div className="binary-result">
                            <div>Binary IP Network : {results.binIpNetwork}</div>
                            <div>Binary First Host : {results.binFirstHost}</div>
                            <div>Binary Last Host : {results.binLastHost}</div>
                            <div>Binary IP Broadcast : {results.binIpBroadcast}</div>
                        </div>
                    </div> : <div className="ip-result">No Result</div>
                }
            </div>
        </div>
    )
}
