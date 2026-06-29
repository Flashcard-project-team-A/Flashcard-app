import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../db';
import '../styles/LernsetOverview.css';
import '../styles/EditButtons.css';
import '../styles/global.css';



export default function LernsetOverview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentSet, setCurrentSet] = useState(null);
    const [LoeschPopup, setLoeschPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activEditingCard, setActivEditingCard] = useState(null);


    //Lernset aus Datenbank laden
    useEffect(() => { //sobald seite im Browser aufploppt mach direkt xy im hintergrund...."
        async function ladeLearnSet() {
            const geladenesSet = await db.lernsets.get(Number(id));//echte zahl aus Id (Text) machen
            setCurrentSet(geladenesSet);
        }
        ladeLearnSet();
    }, [id]); //Lernset wird nur neu geladen wenn User zu anderen Set wechselt



    function handleDeleteSet(){
        setLoeschPopup(true);
    
    }
    function handleCancleSet(){
        setLoeschPopup(false);
    }
    //Set löschen erst nach bestätigung
    async function loescheLernSet() {
        await db.lernsets.delete(Number(id));
        setLoeschPopup(false);//wieder popup schließen
        navigate("/"); //wieder zu home
    }




    //bearbeitungsmodus
    function toggleEditMode() {
        setIsEditing(prev => !prev);
        setActivEditingCard(null);
    }



    async function loescheSingleCard(cardsIndex) {
        const copySingleCard = [...currentSet.karten];
        
        copySingleCard.splice(cardsIndex, 1);
        const newcurrentSet = {
            ...currentSet,
            karten: copySingleCard
        };


        //aktualisieren
        await db.lernsets.put(newcurrentSet);
        setCurrentSet(newcurrentSet);
    }





    //andere funktion um live Änderungen einer Karte im Bearbeitungsmodus zu speichern
    async function handleCardChange(cardsIndex, feld, neuerWert) {

        //wie vorhin wieder kopie ertsellen
        const copycurrentCards = [...currentSet.karten];
        

        //richtiges Feld der Karte updaten
        copycurrentCards[cardsIndex] = {
            ...copycurrentCards[cardsIndex],
            [feld]: neuerWert
        };

        const newcurrentSet = {
            ...currentSet,
            karten: copycurrentCards
        };

        setCurrentSet(newcurrentSet);
        await db.lernsets.put(newcurrentSet);
    }






    if (!currentSet) {
        return <div style={{color: "white", textAlign: "center", marginTop: "50px"}}>Lade Übersicht...</div>;
    }
    return (
        <div className="overview-styling"> {/*//für css style später*/}

            {/*wieder beide Steuerungsbuttons oben rechts*/}
            <div className="top-buttons">
            <button className="edit-button glass glass_button" onClick={toggleEditMode}>
                {isEditing ? "✔️ Fertig" : "✏️ Bearbeiten"}
            </button>          
            <button className="delete-button glass glass_button" onClick={handleDeleteSet}>🗑️ Set löschen</button>
            </div>


            {/*Lernsets Titel <h1 className="overview-title">{currentSet.name}</h1>*/}
            {/* Wenn bearbeitungsmodus-> Zeig input-Feld, sonst normale h1 Titel*/}
            {isEditing ? (
                <input 
                    type="text"
                    className="overview-inline-input overview-title-input"
                    value={currentSet.name}
                    onChange={async (e) => {
                        const neuerName = e.target.value;
                        setCurrentSet(prev => ({ ...prev, name: neuerName }));
                        await db.lernsets.update(Number(id), { name: neuerName });
                    }}
                />
            ):(
                <h2 className="overview-title">{currentSet.name}</h2>
            )}           


            {/*start-Button führt zum Übungsmodus*/}
            {/*in bearbeitungsmodus lieber ausblenden*/}
            {!isEditing &&( 
                <div className="start-btn">
                    <button 
                        className="start-learning-btn"
                        onClick={() => navigate(`/learning/${id}`)}
                    >   ▶
                    </button>
                </div>                
            )}



            <hr className="overview-divider" />

            {/* Lernsetübersicht mit liste aller Karten dadrunter*/}
            <h3 className="cards-number">Karten ({currentSet.karten ? currentSet.karten.length : 0})</h3>
            

            <div className="overview-cards-list">
                {currentSet.karten && currentSet.karten.map((karte, idx) => {
                    //steht diese Karte gerade im fokus?
                    const wirdGeradeEditiert = isEditing && activEditingCard === idx;

                    return (
                        <div 
                            key={idx} 
                            className="overview-card-row"
                            //im bearbeiten-Modus wird die Karte bei klick aktiv
                            onClick={() => {
                                if (isEditing && activEditingCard !== idx) {
                                    setActivEditingCard(idx);
                                }
                            }}
                            style={{ cursor: isEditing ? "pointer" : "default" }}
                        >
                            {/*question Spalte*/}
                            <div className="overview-card-question">
                                <span className="side-label">Frage</span>
                                {wirdGeradeEditiert ? (
                                    <input 
                                        type="text"
                                        className="overview-inline-input"
                                        value={karte.frage}
                                        onChange={(e) => handleCardChange(idx, "frage", e.target.value)}
                                        autoFocus
                                    />
                                ) : (
                                    <p>{karte.frage}</p>
                                )}
                            </div>

                            {/* answer Spalte*/}
                            <div className="overview-card-answer">
                                <span className="side-label">Antwort</span>
                                {wirdGeradeEditiert ? (
                                    <input 
                                        type="text"
                                        className="overview-inline-input"
                                        value={karte.antwort}
                                        onChange={(e) => handleCardChange(idx, "antwort", e.target.value)}
                                    />
                                ) : (
                                    <p>{karte.antwort}</p>
                                )}
                            </div>

                            {/*Mülleimer icon */}
                            {isEditing && (
                                <div className="overview-card-actions">
                                    <button 
                                        className="card-delete-icon" 
                                        onClick={(e) => {
                                            loescheSingleCard(idx);
                                        }}
                                    >🗑️</button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>


            {/*popup fürs Löschen des gesamten Sets*/}
            {LoeschPopup && (
                <div className="popup-background">
                    <div className="popup-box glass">
                        <h3>Bist du sicher?</h3>
                        <p>Möchtest du dieses Lernset wirklich löschen?</p>
                        <div className="popup-buttons">
                            <button className="popup-cancel" onClick={handleCancleSet}>Abbrechen</button>
                            <button className="popup-confirm" onClick={loescheLernSet}>Löschen</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}