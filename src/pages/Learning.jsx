import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";

import "../components/LearningButtons.css";
import "../components/LearningCards.css";
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

    const [progress, setProgress] = useState(0);
    const [currentSet, setCurrentSet] = useState(null);
    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

//Bei Änderung von id ausführen
    useEffect(()=> {
        async function loadSet(){
            const set = await db.lernsets.get(Number(id)) //lernsets mit passender id aus Datenbank in set speichern
            set.karten = set.karten.map(card => ({...card, solved: false}));
            setCurrentSet(set);
            setIndex(0);
        }

        loadSet();

    }, [id]);

    if (!currentSet){
        return <div>Lade Set...</div>;
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


        setProgress(prevProgress => prevProgress + 1);
        setShowAnswer(false);
        showNext();
    }


    function notLearnedClick(){
  
        setShowAnswer(false);
        showNext();
    }

    return (
        <>
    {/*Name des aktuellen Lernsets*/}
            <h2 style={{color:"white",display:"flex",justifyContent:'center'}}>{currentSet.name}</h2> 

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


    {/*Buttons unten zum Nochmal lernen und bestätigen*/}
            <div className="buttons">
                <LearnedBtn onClick={learnedClick}/>
                <TryAgainBtn onClick={notLearnedClick}/>
            </div>
        </>
    );
}