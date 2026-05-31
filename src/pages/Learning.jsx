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

    function handleClick(){
        setProgress(progress +  1);
    }
    
    return (
    <>
{/*Name des aktuellen Lernsets*/}
        <h2 style={{color:"white",display:"flex",justifyContent:'center'}}>Demo Learnset</h2> 

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
    </>
    );
}