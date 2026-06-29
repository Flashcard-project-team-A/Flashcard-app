import { useState } from "react";
//import React from 'react';
import { db } from "../db";
import "../styles/CreateSet.css";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";
/*
//  IndexedDB Setup
const DB_NAME = "LernsetsDB";
const STORE_NAME = "lernsets";

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

async function saveLernset(lernset) {
    const db = await openDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);

        const request = store.add(lernset);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

*/
// Eigentlichre Code
function CreateSet() {
 const navigate = useNavigate();
  const [setName, setSetName] = useState("");
  const [frage, setFrage] = useState("");
  const [antwort, setAntwort] = useState("");
  const [karten, setKarten] = useState([]);
  function addCard() {
    if (frage === "" || antwort === "") {
      alert("Bitte fülle beide Felder aus!");
      return;
    }
    const neueKarte = {
      frage: frage,
      antwort: antwort,
      solved: false,
    };
    setKarten([...karten, neueKarte]);
    setFrage("");
    setAntwort("");
  }

  async function saveSet() {
    if (!setName.trim()) {
      alert("Bitte gib einen Namen für das Lernset ein!");
      return;
    }

    if (karten.length === 0) {
      alert("Füge mindestens eine Karte hinzu!");
      return;
    }

    const lernset = {
      name: setName,
      karten: karten,
      createdAt: new Intl.DateTimeFormat("de-DE").format(new Date()),
    };

    try {
      const id = await db.lernsets.add(lernset);
      alert("Lernset gespeichert! ID: " + id);

      // optional: Reset
      setSetName("");
      setKarten([]);
      setFrage("");
      setAntwort("");
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
      alert("Fehler beim Speichern!");
    }
  }

  return (
    <><div className="Form-container">
        <button className="createSet-glass-btn" onClick={() => navigate("/")}>x</button>
          <h1 className="h1-CreateSet">Lernset erstellen</h1>
          <div className="form-btn">
        <button className=" createSet-glass-btn" onClick={saveSet} >✓</button> </div>
      </div><div className="form-input">


              
              <input
                  type="text"
                  className="line-input"
                  value={setName}
                  onChange={(e) => setSetName(e.target.value)} />
                  <label>Name des Lernsets</label>

             
              
              <input
                  type="text"
                  className="line-input"
                  value={frage}
                  onChange={(e) => setFrage(e.target.value)} />
                  <label>Begriff</label>
             
              <input
                  type="text"
                  className="line-input"
                  value={antwort}
                  onChange={(e) => setAntwort(e.target.value)} />
                   <label>Definition</label>
                   <br></br>
                    <button  className="btn glass" onClick={addCard}>Karte hinzufügen</button>
                   
          </div></>
  );
}

export default CreateSet;
