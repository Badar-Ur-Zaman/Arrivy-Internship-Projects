import React, { useState, memo, useReducer, useCallback, useEffect } from "react";
import classNames from "classnames";
import "./TicTacToe.scss";

/* Memoized Square component */
const Square = memo(({ value, onClick, index }) => {
  console.log("Square Rendering");
  return (
    <button className="Square" onClick={() => onClick(index)}>
      {value}
    </button>
  );
});

/* Calculate winner function for dynamic board size */
function calculateWinner(squares, size) {
  const lines = [];

  // Rows
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    lines.push(row);
  }

  // Columns
  for (let i = 0; i < size; i++) {
    const column = [];
    for (let j = 0; j < size; j++) {
      column.push(i + j * size);
    }
    lines.push(column);
  }

  // Diagonals
  const diagonal1 = [];
  const diagonal2 = [];
  for (let i = 0; i < size; i++) {
    diagonal1.push(i * size + i);
    diagonal2.push((i + 1) * size - (i + 1));
  }
  lines.push(diagonal1, diagonal2);

  // Check for winner
  let winner = lines.reduce((memo, line) => {
    if (line.every(index => squares[index] && squares[index] === squares[line[0]])) {
      memo = squares[line[0]];
    }
    return memo;
  }, "");

  // Check for tie
  if (!winner && squares.every(s => s)) {
    winner = "tie";
  }

  return winner;
}

/* Board component adjusted for dynamic size */
function Board({ squares, onClick, size }) {
  const boardStyle = {
    gridTemplateColumns: `repeat(${size}, 1fr)`,
  };

  return (
    <div className="Board" style={boardStyle}>
      {squares.slice(0, size * size).map((square, i) => (
        <Square key={i} index={i} value={square} onClick={onClick} />
      ))}
    </div>
  );
}

/* Announcement component */
function Announcement({ winner, onStart }) {
  return (
    <div className="Announcement">
      {winner === "tie" ? (
        <div>Tie Game</div>
      ) : (
        <div>
          <div>Congrats</div>
          <h1>{winner}</h1>
        </div>
      )}
      <button className="Button" onClick={onStart}>
        Start
      </button>
    </div>
  );
}

/* Message component */
function Message({ hasStarted, isXNext }) {
  return (
    <div className="Message">
      {hasStarted
        ? isXNext
          ? "It's X's turn"
          : "It's O's turn"
        : "Click to start game"}
    </div>
  );
}

/* Default state */
const defaultState = (size) => ({
  squares: Array(size * size).fill(null),
  isXNext: true,
  winner: "",
});

/* Reducer function */
function reducer(state, action) {
  switch (action.type) {
    case "Start":
      return defaultState(action.size);
    case "handleClick":
      if (state.squares[action.idx] || state.winner) {
        return state;
      }
      const moves = [...state.squares];
      moves[action.idx] = state.isXNext ? "X" : "O";
      return {
        ...state,
        squares: moves,
        isXNext: !state.isXNext,
        winner: calculateWinner(moves, action.size),
      };
    case "UpdateSize":
      let newSquares;
      if (action.size * action.size > state.squares.length) {
        newSquares = [...state.squares, ...Array(action.size * action.size - state.squares.length).fill(null)];
      } else {
        newSquares = state.squares.slice(0, action.size * action.size);
      }
      return {
        ...state,
        squares: newSquares,
      };
    default:
      return state;
  }
}

/* Main Game component */
export default function Game() {
  const [size, setSize] = useState(3);
  const [{ squares, isXNext, winner }, dispatch] = useReducer(reducer, defaultState(size));

  const handleClick = useCallback((i) => {
    dispatch({ type: "handleClick", idx: i, size });
  }, [dispatch, size]);

  const handleStart = useCallback(() => {
    dispatch({ type: "Start", size });
  }, [dispatch, size]);

  useEffect(() => {
    dispatch({ type: "UpdateSize", size });
  }, [size]);

  const handleSizeChange = (e) => {
    const value = e.target.value;
    const newSize = parseInt(value, 10);

    if (!/^\d+$/.test(value) || newSize < 3) {
      return;
    }

    setSize(newSize);
  };

  return (
    <div className={classNames("Game", { "Game--winner": !!winner })}>
      <div>
        <label>
          Board Size:
          <input
            type="number"
            value={size}
            onChange={handleSizeChange}
            min="3"
          />
        </label>
      </div>
      <Board squares={squares} onClick={handleClick} size={size} />
      <Message hasStarted={squares.some(s => s)} isXNext={isXNext} />
      {!!winner && <Announcement winner={winner} onStart={handleStart} />}
    </div>
  );
}
