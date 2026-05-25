import "./Home.css";

function Home() {
  const content = false;

  return (
    <>
    <div className="home">
      <div >
        <h1 className="header">Flashcards App</h1>
      </div>

      {!content && (
        <div className=" container">
          <div className="noContent"><h1>Keine Lernkarten vorhanden</h1><></><p>Bitte legen sie Ihre Lernkarten-Sets an um diese in der Übersicht zu sehen</p>
          </div>
        </div>
      )}

      <button className="glass">+</button>
      </div>
    </>
  );
}

export default Home;
