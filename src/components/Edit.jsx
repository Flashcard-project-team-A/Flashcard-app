import {useState} from "react";

export default function Edit({card, onClose, onSave}){

    //falls karte leer-> nimm leeren Text ""
    const [frage, setFrage]= useState(card?.frage || "");
    const [antwort, setAntwort]= useState(card?.antwort || ""); 

    //prüfen ob Felder leer sind
    function manageSave(){
        if(frage.trim()===""|| antwort.trim()===""){ //leerzeichen wegschneidrn
            alert("Fehler: Eingabefelder dürfen nicht leer sein!");
            return;
        }onSave(frage, antwort);
    }

    return (
        //Popup-fesnter style wiederverwenden
        <div className="popup-background">
            <div className="popup-box  glass">
                <h3>Aktuelle Karte bearbeiten</h3>
                
                {/*Eingabefeld für  frage */}
                <div style={{ marginTop: "1.25rem", textAlign: "left" }}>
                    <label style={{ color: "white", display: "block", marginBottom: "0.625rem", fontSize: "1.25rem" }}>Frage:</label>
                    <input 
                        type="text" 
                        value={frage} 
                        onChange={(e) => setFrage(e.target.value)} 
                        style={{ width: "95%", padding: "0.625rem", borderRadius: "5px",border: "1px solid #ffffff",fontSize: "0.85rem"}}
                    />
                </div>

                {/*Eingabefeld für Antwort*/}
                <div style={{ marginTop: "1.25rem", textAlign: "left" }}>
                    <label style={{ color: "white", display: "block", marginBottom: "0.625rem", fontSize: "1.25rem" }}>Antwort:</label>
                    <input 
                        type="text" 
                        value={antwort} 
                        onChange={(e) => setAntwort(e.target.value)} 
                        style={{ width: "95%", padding: "0.625rem",borderRadius: "5px", border: "1px solid #ffffff",fontSize: "0.85rem"}}
                    />
                </div>

                {/*Die beiden buttons unten */}
                <div className="popup-buttons">
                    <button className="popup-cancel" onClick={onClose}>Abbrechen</button>
                    <button className="popup-update-confirm" onClick={manageSave} >Speichern</button>
                </div>
            </div>
        </div>
    );
}