import './LearningCards.css'

export default function AnswerCard({card, showAnswer, setShowAnswer}){

      

    //toggle showing answer
    return(
        <div className="card"
            onClick={() => setShowAnswer(!showAnswer)}>
                
            {showAnswer? (
                <p>{card?.antwort}</p>
            ) : (
                <p></p>
            )}
        </div>
    );
}