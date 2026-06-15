import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {db} from "../db";
import NoSets from "../components/NoSets.jsx";
import SetList from "../components/SetList.jsx";

function Home() {
  const navigate = useNavigate();

   //Alle Lernsets laden
  const [allSets, setAllSets] = useState([]);
  const setsExist = allSets.length > 0;
  
   //Bei Änderung von id ausführen und alle Lernsets anzeigen
  useEffect(()=> {
    async function showSets(){
      const loadAllSets = await db.lernsets.toArray();
      setAllSets(loadAllSets);
    }
    showSets();
  }, []);

{/*} Alle Sets löschen. NUR FÜR DIE ENTWICKLUNG {*/}
  async function deleteAllSets(){
    await db.lernsets.clear();
    setAllSets([]);
  }
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSets = allSets.filter(set =>
    set.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
  
  {/*} Überschrift und Search Bar{*/}
    <div className="home">
      <div>
        <h1 className="header">Flashcard App</h1>
      </div>
      <div className="searchbox" >
        <div className="glass-box">
          <input
            type="text"
            placeholder="Suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
          </div>      
      </div>


 {/*} Wenn es Sets gibt, zeige sie/SetList-Komponent an. Wenn nicht, zeige NoSet-Komponent an {*/}
    {setsExist? (
      <>
      <><div className=" container">
             <h1>Deine Sets</h1>
          </div>
        </>
        <div className="container">
          <button className="glass-btn-delete" onClick={deleteAllSets}> Alle Sets löschen </button>
        </div>
        
        <div className="container-sets">
<SetList sets={filteredSets} />
        </div>
        
      
      </>
    ) : (
       <><div className="sets">
              <h1>Deine Sets</h1>
            </div><NoSets /></>
    
    )}
    
 {/*} Plus-Icon, um Sets hinzuzufügen {*/}
      <button className="floating-btn glass" onClick={() => navigate("/CreateSet")}>+</button>
      </div>
    </>
  );
}



export default Home;
