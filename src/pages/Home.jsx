import "./Home.css";
import { useNavigate } from "react-router-dom";

import logo from "../assets/unhappy.png";
import {useEffect, useState} from "react";
import {getAllLernsets} from "./indexDB";

function Home() {
  const content = false;
 const navigate = useNavigate();
   const [query, setQuery] = useState("");
   const [lernsets, setLernsets] = useState([]);
useEffect(() => {
  loadLernsets();
}, []);

async function loadLernsets() {
  const daten = await getAllLernsets();
  setLernsets(daten);
}

const gefilterteSets = lernsets.filter((set) =>
  set.name.toLowerCase().includes(query.toLowerCase())
);

  return (
    <>
    <div className="home">
     <div >
        <h1 className="header">Flashcard App</h1>
      </div>
     <div className="searchbox" >
    <div className="glass-box">

    

      <input
        type="text"
        placeholder="Suchen..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />
  </div>
        
    </div>

     

  {gefilterteSets.length > 0 ? (
    <div className="container">
      {gefilterteSets.map((set) => (
        <div key={set.id} className="noContent" onClick={() => navigate(`/lernset/${set.id}`)}>

  <h1>{set.name}</h1>
        <p>{set.karten.length} Karten</p>
      </div>
    ))}
  </div>
) : (
  <div className="img-container">
    <img src={logo} alt="leer" />
    <p>Keine Lernsets vorhanden</p>
  </div>
)}

      <button className="floating-btn glass" onClick={() => navigate("/CreateSet")}>+</button>
      </div>
    </>
  );
}

export default Home;
