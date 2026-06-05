import { useState } from "react";
//import React from 'react';

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

// Eigentlichre Code
function CreateSet() {

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
        createdAt: new Date().toISOString(),
    };

    try {
        const id = await saveLernset(lernset);
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
        <div style={{ padding:"20px"}}>
            <h1>Lernset erstellen</h1>

            <h3>Name des Lernsets</h3>

            <input
                type="text"
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
            />

           

            <h3>Neue Karte</h3>

            <p>Frage:</p>
            <input
            type="text"
            value={frage}
            onChange={(e) => setFrage(e.target.value)}
            />  

            <p>Antwort:</p>
            <input
            type="text"
            value={antwort}
            onChange={(e) => setAntwort(e.target.value)}
            />

            <br></br>
           <br></br>

            <button onClick={addCard}>Karte hinzufügen</button>
           
 <br></br>
  <br></br>
           <button onClick={saveSet} >Lernset speichern</button>

           </div>
    );
}

export default CreateSet;
          