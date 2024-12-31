export default function GameOver({winner, gameRestart}){
return(
    <div id="game-over"> 
        <h2>Game Over!</h2>
        {winner && <p>{winner} won!</p>}
        {!winner &&<p>Game Draw</p>}
        <p><button onClick={gameRestart}>Rematch!</button></p>
    </div>
    );
}