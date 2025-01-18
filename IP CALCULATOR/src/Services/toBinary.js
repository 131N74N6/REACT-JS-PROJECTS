export default function toBinary(ipV4, result, setAttributes, setResults, setShowResult) {
    const { firstSlot, secondSlot, thirdSlot, fourthSlot } = ipV4;
    const netMask = Number(ipV4.netMask); 
    const ipComponent = [firstSlot, secondSlot, thirdSlot, fourthSlot];

    if (ipComponent.some(ip => ip === "" || isNaN(ip)) || isNaN(netMask)) {
        alert("Semua input harus diisi dengan angka valid.");
        return;
    }

    if (ipComponent.every(ip => ip >= 0 && ip <= 255)) {
        setShowResult(true);
        if (netMask === 0) {
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
}
