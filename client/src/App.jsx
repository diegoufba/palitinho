import React, { useState, useEffect } from 'react';
import WaitRoom from './components/WaitRoom';
import Game from './components/Game';
import PlayerMove from './components/PlayerMove';
import io from 'socket.io-client';
import Container from '@mui/material/Container';

const socket = io('http://' + import.meta.env.VITE_IP + ':3001');
// const socket = io('http://localhost:3001');
// const socket = io('http://192.168.0.232:3001');
// const socket = io('http://172.20.10.2:3001');

function App() {

  const [playerNumber, setPlayerNumber] = useState()

  const [playerTurn, setPlayerTurn] = useState(false)

  const [playersGuess, setPlayersGuess] = useState([])


  const [numberOfPlayers, setnumberOfPlayers] = useState()

  const [gameStart, setGameStart] = useState(false)

  const [ganhador, setGanhador] = useState()


  const [players, setPlayers] = useState([
    {
      id: null,
      number: 1,
      score: 0,
      move: null,
      guessTotal: null
    },
    {
      id: null,
      number: 2,
      score: 0,
      move: null,
      guessTotal: null
    },
    {
      id: null,
      number: 3,
      score: 0,
      move: null,
      guessTotal: null
    },
    {
      id: null,
      number: 4,
      score: 0,
      move: null,
      guessTotal: null
    }
  ])

  socket.on('players', (players) => {
    setPlayers(players)
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

  socket.on('turnControl', (number) => {
    if (playerNumber === number) {
      setPlayerTurn(true)
    }
  })

  socket.on('playersGuess', (playersGuess) => {
    setPlayersGuess(playersGuess)
  })

  socket.on('resetGanhador', () => {
    setGanhador(null)
  })

  socket.on('endTurn', (ganhador) => {
    setGanhador(ganhador)
  })

  socket.on('endGameOk', () => {
    setGameStart(false)
  })

  return (
    <Container maxWidth="xl">
      {socket && !gameStart && <WaitRoom
        playersGuess={playersGuess} setPlayersGuess={setPlayersGuess}
        ganhador={ganhador} setGanhador={setGanhador}
        playerNumber={playerNumber} setPlayerNumber={setPlayerNumber}
        playerTurn={playerTurn} setPlayerTurn={setPlayerTurn}
        numberOfPlayers={numberOfPlayers} setnumberOfPlayers={setnumberOfPlayers}
        players={players} setPlayers={setPlayers}
        setGameStart={setGameStart}
        socket={socket} />}

      {socket && gameStart && !playerTurn && < Game
        playersGuess={playersGuess} setPlayersGuess={setPlayersGuess}
        ganhador={ganhador} setGanhador={setGanhador}
        playerNumber={playerNumber} setPlayerNumber={setPlayerNumber}
        playerTurn={playerTurn} setPlayerTurn={setPlayerTurn}
        numberOfPlayers={numberOfPlayers} setnumberOfPlayers={setnumberOfPlayers}
        players={players} setPlayers={setPlayers}
        setGameStart={setGameStart}
        socket={socket} />}

      {socket && gameStart && playerTurn && <PlayerMove
        playersGuess={playersGuess} setPlayersGuess={setPlayersGuess}
        ganhador={ganhador} setGanhador={setGanhador}
        playerNumber={playerNumber} setPlayerNumber={setPlayerNumber}
        playerTurn={playerTurn} setPlayerTurn={setPlayerTurn}
        numberOfPlayers={numberOfPlayers} setnumberOfPlayers={setnumberOfPlayers}
        players={players} setPlayers={setPlayers}
        setGameStart={setGameStart}
        socket={socket} />}
    </Container >
  );
}

export default App;
