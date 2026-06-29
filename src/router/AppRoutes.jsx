import { Routes, Route } from "react-router-dom";
import CreateSet from "../pages/CreateSet"
import Home from "../pages/Home";
import Learning from "../pages/Learning";
import LernsetOverview from "../pages/LernsetOverview";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lernsetoverview/:id" element={<LernsetOverview />} />
      <Route path="/learning/:id" element={<Learning/>} />
      <Route path="/CreateSet" element={<CreateSet/>}/>
    </Routes>
  );
}