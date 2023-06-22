import logo from "./logo.svg";
import "./App.css";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            {/* <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="About" element={<About />} />
                    <Route path="Gallery" element={<Gallery />} />
                </Routes>
            </BrowserRouter> */}
            <Home />
        </>
    );
}

export default App;
