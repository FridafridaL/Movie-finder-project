import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import "./App.css";

export const App = () => {
  return (
    <div>
      <LandingPage />
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<MovieList />} />
    //     <Route path="/movie/:id" element={<MovieCard />} />
    //   </Routes>
    // </BrowserRouter>
  );
};
