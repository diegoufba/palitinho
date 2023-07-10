import React, { useState, useEffect } from 'react';
import WaitRoom from './components/WaitRoom';
import Game from './components/Game';
import PlayerMove from './components/PlayerMove';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {

  const [playerNumber, setPlayerNumber] = useState()
  const [playerScore, playerSetScore] = useState()
  const [numberOfPlayers, setnumberOfPlayers] = useState()

  const [gameStart, setGameStart] = useState(false)

  const [players, setPlayers] = useState([
    {
      id: null,
      number: 1,
      score:0
    },
    {
      id: null,
      number: 2,
      score:0
    },
    {
      id: null,
      number: 3,
      score:0
    },
    {
      id: null,
      number: 4,
      score:0
    }
  ])

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  return (
    <>
      {/* {socket && !gameStart && <WaitRoom
        playerNumber={playerNumber}
        setPlayerNumber={setPlayerNumber}
        numberOfPlayers={numberOfPlayers}
        setnumberOfPlayers={setnumberOfPlayers}
        players={players} setPlayers={setPlayers}
        setGameStart={setGameStart} socket={socket} />}
      {socket && gameStart && <PlayerMove players={players} setPlayers={setPlayers} socket={socket} />} */}

      {/* <PlayerMove  /> */}
      <Game/>
    </>
  );
}

export default App;
