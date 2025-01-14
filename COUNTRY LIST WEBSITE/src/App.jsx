import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Country from "./Pages/Country";
import Detail from "./Pages/Detail";
import SearchResult from "./Pages/SearchResult";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Country />} />
          <Route path="/detail/:name" element={<Detail />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
