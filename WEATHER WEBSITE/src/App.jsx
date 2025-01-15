import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CurrentLoc from "./Pages/CurrentLoc";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Weather from "./Pages/Weather";
const queryClient = new QueryClient();

export default function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/" element={<CurrentLoc/>}/>
                        <Route path="/weather-info" element={<Weather/>}/>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    )
}
