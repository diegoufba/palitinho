import React, { useState, useEffect } from 'react';
import WaitRoom from './components/WaitRoom';
import Game from './components/Game';
import PlayerMove from './components/PlayerMove';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {

  const [playerNumber, setPlayerNumber] = useState()
  const [playerScore, playerSetScore] = useState()
  const [playerTurn, setPlayerTurn] = useState(false)


  const [numberOfPlayers, setnumberOfPlayers] = useState()

  const [gameStart, setGameStart] = useState(false)


  const [players, setPlayers] = useState([
    {
      id: null,
      number: 1,
      score: 0,
      move: 0,
      guessTotal: 0
    },
    {
      id: null,
      number: 2,
      score: 0,
      move: 0,
      guessTotal: 0
    },
    {
      id: null,
      number: 3,
      score: 0,
      move: 0,
      guessTotal: 0
    },
    {
      id: null,
      number: 4,
      score: 0,
      move: 0,
      guessTotal: 0
    }
  ])

  socket.on('players', (players) => {
    setPlayers(players)
  })

  socket.on('turnControl', (number) => {
    if (playerNumber === number) {
      setPlayerTurn(true)
    }
  })

  socket.on('playerNumber', (playerNumber) => {
    setPlayerNumber(playerNumber)
  })

  socket.on('numberOfPlayers', (numberOfPlayers) => {
    setnumberOfPlayers(numberOfPlayers)
  })

  socket.on('startGameOk', () => {
    setGameStart(true)
  })

  return (
    <>
      {socket && !gameStart && <WaitRoom
        playerNumber={playerNumber} setPlayerNumber={setPlayerNumber}
        playerTurn={playerTurn} setPlayerTurn={setPlayerTurn}
        numberOfPlayers={numberOfPlayers} setnumberOfPlayers={setnumberOfPlayers}
        players={players} setPlayers={setPlayers}
        setGameStart={setGameStart}
        socket={socket} />}

      {socket && gameStart && !playerTurn && < Game
        playerNumber={playerNumber} setPlayerNumber={setPlayerNumber}
        playerTurn={playerTurn} setPlayerTurn={setPlayerTurn}
        numberOfPlayers={numberOfPlayers} setnumberOfPlayers={setnumberOfPlayers}
        players={players} setPlayers={setPlayers}
        setGameStart={setGameStart}
        socket={socket} />}

      {socket && gameStart && playerTurn && <PlayerMove
        playerNumber={playerNumber} setPlayerNumber={setPlayerNumber}
        playerTurn={playerTurn} setPlayerTurn={setPlayerTurn}
        numberOfPlayers={numberOfPlayers} setnumberOfPlayers={setnumberOfPlayers}
        players={players} setPlayers={setPlayers}
        setGameStart={setGameStart}
        socket={socket} />}
    </>
  );
}

export default App;
