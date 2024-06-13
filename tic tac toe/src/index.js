import React from "react";
import ReactDOM from "react-dom";
import TicTacToe from "./TicTacToe";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);