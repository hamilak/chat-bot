import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/chat" element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
