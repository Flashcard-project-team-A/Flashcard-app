import {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";

import "../components/Temp.css";
import {db} from "../db";

import LearnedBtn from "../components/LearnedBtn.jsx";
import TryAgainBtn from "../components/TryAgainBtn.jsx";
import Progressbar from "../components/Progressbar.jsx";
import AnswerCard from "../components/AnswerCard.jsx";
import QuestionCard from "../components/QuestionCard.jsx";


export default function Learning(){

    console.log("DB:", db);
    
    //Set laden
//id aus URL holen (z.B. .../learning/1 -> id = 1)
    const {id} = useParams(); 
    const navigate = useNavigate();

    const [progress, setProgress] = useState(0);
    const [currentSet, setCurrentSet] = useState(null);
    const [index, setIndex] = useState(0);
    //Für das Popup-Fenster, am Anfang nicht sichtbar-> false
    const [showPopup, setShowPopup] = useState(false);

//Bei Änderung von id ausführen
    useEffect(()=> {
        async function loadSet(){
            const set = await db.lernsets.get(Number(id)) //lernsets mit passender id aus Datenbank in set speichern
            setCurrentSet(set);
        }

        loadSet();

    }, [id]);

    if (!currentSet){
        return <div>Lade Set...</div>;
    }

    if (!currentSet.karten || currentSet.karten.length === 0) {
        return <div style={{color: "white", textAlign: "center", marginTop: "50px"}}>Dieses Set hat noch keine karten</div>;
    }

//Klick auf Bestätigungsbutton soll Fortschrittsanzeige erhöhen
    

    function handleClick(){
        if(index < currentSet.karten.length-1){
            setIndex(prevIndex => prevIndex + 1);
        }
        setProgress(progress +  1);
        
    }
    
//Bestätigung im Pop-up-Fenster fürs Löschen
    function handleDeleteCard() {
        setShowPopup(true);
    }

    function handleCancelDelete() {
        setShowPopup(false);
    }



// um einzelne Karten zu löschen, nciht das gesamte Set!
    async function handleConfirmDelete() {
        const copycurrentCards = [...currentSet.karten];
        copycurrentCards.splice(index, 1);

        const newcurrentSet= {
            ...currentSet,
            karten:copycurrentCards
        };

        await db.lernsets.put(newcurrentSet);
        setCurrentSet(newcurrentSet);
        setShowPopup(false);

        //falls man die letzte Karte gelöscht hat, index anpassen 
        if (index >= copycurrentCards.length && index > 0) {
            setIndex(index - 1);
        }
    }

    return (
    <>
{/* Steuerungsbuttons oben rechts*/}
        <div className="top-buttons">
            <button className="edit-button">✏️Bearbeiten</button>
            <button className="delete-button" onClick={handleDeleteCard}>🗑️Löschen</button>
        </div>

{/*Name des aktuellen Lernsets*/}
        <h2 style={{color:"white",display:"flex",justifyContent:'center'}}>{currentSet.name}</h2> 

{/*Fortschrittsanzeige für das Lernset. Nicht auf die Karten selbst tun, sondern woanders auf die Seite*/}
        <Progressbar progress={progress}/>

{/*Frage und Antwort-Karte*/}
        <div className = "cardsContainer">
            <QuestionCard card={currentSet.karten[index]}/>
            <AnswerCard card={currentSet.karten[index]}/>
        </div>

{/*Buttons unten zum Nochmal lernen und bestätigen*/}
        <div className="buttons">
            <LearnedBtn onClick={handleClick}/>
            <TryAgainBtn/>
        </div>


{/*Pop-up-Fenster bauen */}
        {showPopup && (
            <div className="popup-background">
                <div className="popup-box">
                    <h3>Bist du sicher?</h3>
                    <p>Möchtest du diese Lernkarte wirklich löschen?</p>
                    <div className="popup-buttons">
                        <button className="popup-cancel" onClick={handleCancelDelete}>Abbrechen</button>
                        <button className="popup-confirm" onClick={handleConfirmDelete}>Löschen</button>
                    </div>
                </div>
            </div>
        )}



    </>
    );
}
