import React, { useState } from "react";
import PlayerBLock from "./components/player.jsx";
import GameBoard from "./components/gameBoard.jsx";
import Log from "./components/log.jsx";
import GameOver from "./components/GameOver.jsx";

const WINNING_COMBINATIONS = [
  [
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
  ],
  [
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
  ],
  [
    { row: 2, column: 0 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 0 },
    { row: 2, column: 0 },
  ],
  [
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 2, column: 1 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 1 },
    { row: 2, column: 0 },
  ],
];

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(turns) {
  let currentPlayer = "X";

  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  return currentPlayer;
}

function App() {
  const [turn, setTurn] = useState([]);

  const activePlayer = derivedActivePlayer(turn);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  // updating the initialGameBoard with state's prev data
  for (const eachTurn of turn) {
    const { square, player } = eachTurn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = undefined;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  let draw = turn.length === 9 && !winner;

  function changeTurn(rowIndex, colIndex) {
    setTurn((prevTrun) => {
      const currentPlayer = derivedActivePlayer(prevTrun);
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTrun,
      ];

      return updatedTurns;
    });
  }

  function handleRstart() {
    setTurn([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerBLock name="Player 1" type="X" isActive={activePlayer} />
          <PlayerBLock name="Player 2" type="O" isActive={activePlayer} />
        </ol>
        {winner && <GameOver winner={winner} handleRestart={handleRstart} />}
        {draw && <GameOver isDraw={draw} handleRestart={handleRstart} />}
        <GameBoard changeTurn={changeTurn} board={gameBoard} />
      </div>
      <Log turns={turn} />
    </main>
  );
}

export default App;
