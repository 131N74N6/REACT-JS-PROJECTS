import Home from "./Pages/Home";
import V4Calculator from "./Pages/V4Calculator";
import V6Calculator from "./Pages/V6Calculator";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/ipv4calculator" element={<V4Calculator/>}/>
                <Route path="/ipv6calculator" element={<V6Calculator/>}/>
            </Routes>
        </Router>
    )
}
