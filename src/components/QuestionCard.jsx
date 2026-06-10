import './LearningCards.css'

export default function QuestionCard({card}){
return (
      <div className="card">
            <p>{card?.frage}</p>
      </div>
);
}