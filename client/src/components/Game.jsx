import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function Game({ playersGuess, setPlayersGuess, ganhador, setGanhador, socket, players, setPlayers, setGameStart, playerNumber, setPlayerNumber, numberOfPlayers, setnumberOfPlayers, playerTurn, setPlayerTurn }) {


  const newTurn = () => {
    socket.emit('newTurn')
  }

  const endGame = () => {
    socket.emit('endGame')
  }

  return (
    <>
      <Typography variant="h3" gutterBottom>Palitinho Game</Typography>
      {ganhador && <Typography variant="h4" gutterBottom>{ganhador !== -1 ? `Ganhador: ${ganhador}` : 'Sem ganhadores'}</Typography>}
      {players.map((player) => {
        return player.id ?
          <Typography color={player.number === playerNumber && 'green'} key={player.number} variant="h5" gutterBottom>
            {`P${player.number} : ${player.score}`} {ganhador && player.move !== null && `J: ${player.move}`} {player.guessTotal !== null && `T: ${player.guessTotal}`}
          </Typography> : null
      })}
      {playerNumber && ganhador && <Button onClick={() => newTurn()} variant="contained">Nova Rodada</Button>}
      {playerNumber && ganhador && <Button color='error' sx={{ ml: 3 }} onClick={() => endGame()} variant="contained">End Game</Button>}

    </>
  )
}
