export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn, ti) => (
        <li key={`${(turn.square.row, turn.square.col, ti)}`}>
          {turn.player} {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
