import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <>
        <header className="header-1">
            <Link to={"/"}>Home</Link>
            <Link to={"/ipv4calculator"}>IpV4 Calculator</Link>
            <Link to={"/ipv6calculator"}>IpV6 Calculator</Link>
        </header>
        <header className="header-2">
            <Link to={"/"}>Home</Link>
            <Link to={"/ipv4calculator"}>IpV4-Calculator</Link>
            <Link to={"/ipv6calculator"}>IpV6-Calculator</Link>
        </header>
        </>
    )
}
