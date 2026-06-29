import '../styles/LearningCards.css'

export default function QuestionCard({card}){
return (
      <div className="nohover card glass">
            <p>{card?.frage}</p>
      </div>
);
}