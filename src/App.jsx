import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Pages/landingpage/LandingPage.jsx";
import { DetailPage } from "./Pages/DetailPage.jsx";
import "./App.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};
