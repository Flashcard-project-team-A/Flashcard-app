import { Routes, Route } from "react-router-dom";
import CreateSet from "../pages/CreateSet"
import Home from "../pages/Home";
import Learning from "../pages/Learning";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learning/:id" element={<Learning/>} />
      <Route path="/CreateSet" element={<CreateSet/>}/>
    </Routes>
  );
}