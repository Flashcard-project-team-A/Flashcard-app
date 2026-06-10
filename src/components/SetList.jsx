import { useNavigate } from "react-router-dom";

export default function SetList({sets}){
    const navigate = useNavigate();
    return(
        <>
            {sets.map((set) => (
           
                    <div
                key = {set.id}
                onClick={() => navigate("/learning/" + set.id)}
                className="glass-box"
                >
                    <h3>{set.name}</h3>
                    <p>{set.karten.length} Karten </p>
                    <p> Erstellungsdatum: {set.createdAt} </p>
                </div>
           
            ))}
        </>
    );
}