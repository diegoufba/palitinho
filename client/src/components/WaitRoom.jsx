import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function WaitRoom({playersGuess,setPlayersGuess, ganhador, setGanhador, socket, players, setPlayers, setGameStart, playerNumber, setPlayerNumber, numberOfPlayers, setnumberOfPlayers, playerTurn, setPlayerTurn }) {


    const joinRoom = () => {
        socket.emit('joinRoom')
    }

    const startGame = () => {
        socket.emit('startGame')
    }

    return (
        <>
            <Typography variant="h3" gutterBottom>Sala de espera</Typography>
            {players.map((player) => (
                <Box key={player.number} color={player.number === playerNumber && 'green'}>
                    <Typography sx={{ fontSize: '1.4rem' }} variant="body1" gutterBottom>
                        {player.id ? `Jogador ${player.number}` : `Aguardadando Jogador ${player.number} ...`}
                    </Typography>
                </Box>
            ))}
            {playerNumber ?
                <Button sx={{ mr: 2 }} disabled={numberOfPlayers >= 2 ? false : true} onClick={() => startGame()} variant="contained">Start</Button> :
                <Button sx={{ mr: 2 }} disabled={numberOfPlayers >= 4 ? true : false} onClick={() => joinRoom()} variant="contained">Join</Button>
            }

        </>
    )
}
