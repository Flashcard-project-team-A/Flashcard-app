import logo from "../assets/unhappy.png";        
          
export default function NoSets(){
    return(
        <>
            <div className="img-container"><img src={logo} alt=":(" />
                <p>Leider keine eigenen Lernsets verfügbar</p>
            </div>
        </>
    );
}