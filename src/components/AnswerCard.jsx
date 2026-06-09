import './Temp.css'

export default function AnswerCard({card}){
    return(
        <div className="card">
            <p>{card?.antwort}</p>
        </div>
    );
}