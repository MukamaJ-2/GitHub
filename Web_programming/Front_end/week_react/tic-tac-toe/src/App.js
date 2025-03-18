import { useState } from "react";
import "./App.css";


function Square({ value }) {
  const [name, setName] = useState(null);

  function handleButtonClick() {
    console.log("clicked", name);
    setName("X");
  }
  return (
    <button onClick={handleButtonClick} className="square">
      {name}
    </button>
  );
}

function App() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}

export default App;
