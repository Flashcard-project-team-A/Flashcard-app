import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../dist/assets/unhappy.png";

function Home() {
  const content = false;
 const navigate = useNavigate();
   const [query, setQuery] = useState("");


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

     

      {!content && (
        <><div className=" container">
            <div className="noContent" onClick={() => navigate("/learning")}><h1>Lernkarten Demo</h1><></><p>Eine einfache Lernkarten Demo,um die App zu testen. Dücke auf das Lernset, um den Lernmodus zu starten</p>
            </div>
          </div><div className="img-container"><img src={logo} alt="sadasdas" />
          
          <p>Leider keine eigenen Lernsets verfügbar</p>
          </div></>

      )}

      <button className="floating-btn glass">+</button>
      </div>
    </>
  );
}

export default Home;
