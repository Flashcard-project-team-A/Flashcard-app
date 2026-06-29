import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function SetList({sets}){
    const navigate = useNavigate();

    
    return(
        <>
            {sets.map((set) => (
           
                    <div
                key = {set.id}
                onClick={() => navigate("/lernsetoverview/" + set.id)}
                className="glass glass-box"
                >
                    <h3>{set.name}</h3>
                    <p>{set.karten.length} Karten </p>
                    <p style={{fontSize: "0.5rem" }}> Erstellungsdatum: {set.createdAt} </p>
                </div>
           
            ))}
        </>
    );
}