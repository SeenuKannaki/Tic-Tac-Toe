import Player from "./Components/Players-info"
import { useState } from "react"
import GameBoard from "./Components/GameBoards"
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
import { WINNING_COMBINATIONS } from "./Components/Winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  'X':'Player 1',
  'O':'Player 2'
};

function deriveActivePlayers(gameTurns){
  
  return gameTurns.length % 2 === 0 ? 'X' : 'O';
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])];

    for(const turn of gameTurns){
        const{square, player} = turn;
        const{row, col} = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner = null;
    for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol =  gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
          winner = players[firstSquareSymbol];
          break;
      }
    }
    return winner;
}

function App() {
  const[players, setPlayers] = useState(PLAYERS);

    const[gameTurns, setGameTurns] = useState([]);
  
    const activePlayer = deriveActivePlayers(gameTurns);

    const gameBoard = deriveGameBoard(gameTurns);

    const winner = deriveWinner(gameBoard, players);

    const hasDraw = !winner && gameTurns.length === 9 ;

  function handleSelectSquare(rowIndex, colIndex){
    
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayers(prevTurns);

      const updatedTurns = [{square:{row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns,];
      return updatedTurns;
    });
    
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return({
        ...prevPlayers,
        [symbol]: newName
      });
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive ={activePlayer==='X'} onChange={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive ={activePlayer==='O'} onChange={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw )&& <GameOver winner={winner} gameRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
