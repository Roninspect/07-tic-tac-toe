export default function GameOver({ winner, isDraw, handleRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {isDraw ? <p>Draw!!!</p> : <p>{winner} won!</p>}

      <p>
        <button onClick={handleRestart}>Rematch!</button>
      </p>
    </div>
  );
}
