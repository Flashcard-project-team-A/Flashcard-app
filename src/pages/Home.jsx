import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {db} from "../db";
import NoSets from "../components/NoSets.jsx";
import SetList from "../components/SetList.jsx";

function Home() {
  const content = false;
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
          </div>      
      </div>

   {/*} Begrüßungs-Text {*/}
      {!content && (
        <><div className=" container">
              <h1>Deine Sets</h1>
              <p>Drücke auf das Lernset, um den Lernmodus zu starten!</p>
          </div>
        </>
      )}

 {/*} Wenn es Sets gibt, zeige sie/SetList-Komponent an. Wenn nicht, zeige NoSet-Komponent an {*/}
    {setsExist? (
      <>
        <button onClick={deleteAllSets}> Alle Sets löschen </button>
        <SetList sets={allSets} />
      </>
    ) : (
      <NoSets/>
    )}
    
 {/*} Plus-Icon, um Sets hinzuzufügen {*/}
      <button className="floating-btn glass" onClick={() => navigate("/CreateSet")}>+</button>
      </div>
    </>
  );
}



export default Home;
