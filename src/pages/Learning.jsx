import {useState} from 'react';

import "../components/Temp.css";

import LearnedBtn from "../components/LearnedBtn.jsx";
import TryAgainBtn from "../components/TryAgainBtn.jsx";
import Progressbar from "../components/Progressbar.jsx";
import AnswerCard from "../components/AnswerCard.jsx";
import QuestionCard from "../components/QuestionCard.jsx";


export default function Learning(){

//Klick auf Bestätigungsbutton soll Fortschrittsanzeige erhöhen
    const [progress, setProgress] = useState(0);

    //Für das Popup-Fenster, am Anfang nicht sichtbar-> false
    const [showPopup, setShowPopup] = useState(false);

    function handleClick(){
        setProgress(progress +  1);
    }
    
//Bestätigung im Pop-up-Fenster fürs Löschen
    function handleDeleteCard() {
        setShowPopup(true);
    }

    function handleCancelDelete() {
        setShowPopup(false);
    }

    function handleConfirmDelete() {

        setShowPopup(false);
    }


    return (
    <>
{/* Steuerungsbuttons oben rechts*/}
        <div className="top-buttons">
            <button className="edit-button">✏️Bearbeiten</button>
            <button className="delete-button" onClick={handleDeleteCard}>🗑️Löschen</button>
        </div>

{/*Name des aktuellen Lernsets*/}
        <h2 style={{color:"white"}}>Name des Sets</h2> 

{/*Fortschrittsanzeige für das Lernset. Nicht auf die Karten selbst tun, sondern woanders auf die Seite*/}
        <Progressbar progress={progress}/>

{/*Frage und Antwort-Karte*/}
        <div className = "cardsContainer">
            <QuestionCard/>
            <AnswerCard/>
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
