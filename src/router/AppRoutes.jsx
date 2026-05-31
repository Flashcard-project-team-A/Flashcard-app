import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Learning from "../pages/Learning";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learning" element={<Learning />} />
    </Routes>
  );
}