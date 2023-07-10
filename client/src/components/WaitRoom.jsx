import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function WaitRoom({ socket, players, setPlayers, setGameStart, playerNumber, setPlayerNumber, numberOfPlayers, setnumberOfPlayers }) {



    socket.on('players', (players) => {
        setPlayers(players)
    })

    socket.on('receive-message', (message) => {
        console.log(message)
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
