import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function Game({ socket, players, setPlayers, setGameStart, playerNumber, setPlayerNumber, numberOfPlayers, setnumberOfPlayers,playerTurn,setPlayerTurn }) {

  // const [totalPalitinho, setTotalPalitinho] = useState(0);
  // const [move, setMove] = useState(0);
  
  return (
    <>
      <Typography variant="h3" gutterBottom>Palitinho Game</Typography>
      {players.map((player) => {
        return player.id ? <Typography color={player.number === playerNumber && 'green'} key={player.number} variant="h5" gutterBottom>{`P${player.number} - S: ${player.score} - J: ${player.move} T: ${player.guessTotal}`}</Typography> : null
      })}
    </>
  )
}
