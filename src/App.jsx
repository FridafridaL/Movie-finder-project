import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Pages/landingpage/LandingPage.jsx";
import { DetailPage } from "./Pages/detailpage/DetailPage.jsx";
import "./App.css";

export const App = () => {
  return (
    // browserRouter for the entire app
    <BrowserRouter>
      {/* Routes and route for the correspondence in the app */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};
