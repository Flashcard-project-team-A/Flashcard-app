import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

import "../styles/LearningButtons.css";
import "../styles/LearningCards.css";
import "../styles/EditButtons.css";
import "../styles/global.css";
import {db} from "../db";

import LearnedBtn from "../components/LearnedBtn.jsx";
import TryAgainBtn from "../components/TryAgainBtn.jsx";
import Progressbar from "../components/Progressbar.jsx";
import AnswerCard from "../components/AnswerCard.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import Edit from "../components/Edit.jsx";



export default function Learning(){

    console.log("DB:", db);
    
    //Set laden
//id aus URL holen (z.B. .../learning/1 -> id = 1)
    const {id} = useParams(); 

   // const [progress, setProgress] = useState(0);
    const [currentSet, setCurrentSet] = useState(null);
    const [index, setIndex] = useState(0);

    function shuffleCards(cards){
    return [...cards].sort(() => Math.random() - 0.5);
}

    //Für das Popup-Fenster, am Anfang nicht sichtbar-> false
    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    
    const [showAnswer, setShowAnswer] = useState(false);

//Bei Änderung von id ausführen
 useEffect(()=> {
    async function loadSet(){

        const set = await db.lernsets.get(Number(id));

        const shuffledCards = shuffleCards(
            set.karten.map(card => ({
                ...card,
                solved: false
            }))
        );

        const shuffledSet = {
            ...set,
            karten: shuffledCards
        };

        setCurrentSet(shuffledSet);
        setIndex(0);
    }

    loadSet();

}, [id]);

    if (!currentSet){
        return <div>Lade Set...</div>;
    }

    if (!currentSet.karten || currentSet.karten.length === 0) {
        return <div style={{color: "white", textAlign: "center", marginTop: "50px"}}>Dieses Set hat noch keine karten</div>;
    }
    
    const currentCard = currentSet.karten[index];

//Klick auf Bestätigungsbutton soll Fortschrittsanzeige erhöhen
    //Sichtbarkeit der Lösungen

    const solvedCount = currentSet.karten.filter(c => c.solved).length;
    const total = currentSet.karten.length;
    const allSolved = solvedCount === total;



    function showNext(){
        //Schaue, ob danach eine Karte noch ungelernt ist. Erst wenn danach keine mehr ist, fang wieder vorne an.
        //liefert -1, wenn kein Index gefunden wurde, der größer als aktueller ist und wo Karte ungelöst ist
        const nextIndex = currentSet.karten.findIndex((card, i) => i > index && !card.solved); 
        
        if (nextIndex !== -1){
            setIndex(nextIndex); //wenn Index gefunden wurde, setzte diesen
        }
        else{
            const firstUnsolved = currentSet.karten.findIndex(card => !card.solved); //wenn Index nicht danach gefunden wurde, suche davor
            if (firstUnsolved !== -1){
                setIndex(firstUnsolved); //Gehe zu de gefundenen Index
            }
            else{
                setIndex(0); //wenn kein Index gefunden wurde, setze ihn auf 0. 
            }
        }
    }


    function learnedClick(){
        //Suche aktuelle Karte im aktuellen Set und setze solved = true. Alle anderen bleiben wie sie sind.
        setCurrentSet(prev => ({...prev, 
            karten: prev.karten.map((card, i) => 
            i === index ? { ...card, solved: true} : card)
        }));


        //setProgress(prevProgress => prevProgress + 1);
        setShowAnswer(false);
        showNext();
    }


    function notLearnedClick(){
  
        setShowAnswer(false);
        showNext();
    }
    
//Bestätigung im Popup-Fenster fürs Löschen
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


        //falls man die letzte Karte gelöscht hat, index anpassen 
        if (copycurrentCards.length ===0) {
            setIndex(0); //greift oben auf "dieses  Set hat noch keine karten"
        } else if(index >=copycurrentCards.length){
            setIndex(copycurrentCards.length-1);
        }

        await db.lernsets.put(newcurrentSet);
        setCurrentSet(newcurrentSet);
        setShowPopup(false);


    }

    async function handleUpdateCard(neueFrage, neueAntwort){
        const copycurrentCards=[...currentSet.karten];
        copycurrentCards[index] = {
            ...copycurrentCards[index],
            frage: neueFrage,
            antwort: neueAntwort
        };

        const newcurrentSet = {
            ...currentSet,
            karten: copycurrentCards
        };

        await db.lernsets.put(newcurrentSet);
        setCurrentSet(newcurrentSet);
        setShowEditPopup(false);
    }

    return (
    <>
    {/* Steuerungsbuttons oben rechts*/}
        <div className="top-buttons">
            <button className="edit-button glass glass_button" onClick={()=> setShowEditPopup(true)}>✏️Bearbeiten</button>
            <button className="delete-button glass glass_button" onClick={handleDeleteCard}>🗑️Löschen</button>
        </div>

    {/*Fortschrittsanzeige für das Lernset. Nicht auf die Karten selbst tun, sondern woanders auf die Seite*/}
            <Progressbar progress={Math.round((solvedCount/total) * 100)}/>

    {/*Frage und Antwort-Karte*/}
            <div className = "cardsContainer">
                {allSolved? (
                    <h2> Alles gelernt! </h2>
             ): (
            <>
                    <QuestionCard card={currentCard}/>
                    <AnswerCard card={currentCard} 
                    showAnswer={showAnswer}
                    setShowAnswer={setShowAnswer}/>
            </>
        )}
            </div>
    
    {/*Popup-Fenster bauen fürs löschen*/}
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

    {/*edit Popup-Fenster anzeigen */}
        {showEditPopup &&(
            <Edit 
            card={currentSet.karten[index]} 
            onClose={() => setShowEditPopup(false)} 
            onSave={handleUpdateCard}
            />
        )}

    {/*Buttons unten zum Nochmal lernen und bestätigen*/}
        <div className="buttons">
            <LearnedBtn onClick={learnedClick}/>
            <TryAgainBtn onClick={notLearnedClick}/>
        </div>
        </>
    );
}