export default function GameBoard({ changeTurn, board }) {
  //   const [gameBoard, setgameBoard] = useState(initialGameBoard);

  //   function handleSelectedSquare(row, col) {
  //     setgameBoard((prevBoard) => {
  //       const newBoard = [...prevBoard.map((innerArray) => [...innerArray])];
  //       // Update the selected square with "X"

  //       if (prevBoard[row][col] == null) {
  //         newBoard[row][col] = activeType;
  //         changeTurn();
  //       } else {
  //         console.log("Can't select this box");
  //       }

  //       return newBoard;
  //     });
  //   }

  return (
    <ol id="game-board">
      {board.map((row, rowindex) => (
        <li key={rowindex}>
          <ol>
            {row.map((type, colindex) => (
              <li key={colindex}>
                <button
                  onClick={() => changeTurn(rowindex, colindex)}
                  disabled={board[rowindex][colindex] != null}
                >
                  {type}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
