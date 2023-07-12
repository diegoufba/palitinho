import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function WaitRoom({totalPalito, playersGuess, setPlayersGuess, ganhador, setGanhador, socket, players, setPlayers, setGameStart, playerNumber, setPlayerNumber, numberOfPlayers, setnumberOfPlayers, playerTurn, setPlayerTurn }) {


    const joinRoom = () => {
        socket.emit('joinRoom')
    }

    const startGame = () => {
        socket.emit('startGame')
    }

    return (
        <>
            <Typography sx={{textAlign:'center',mb:4,fontFamily: 'Bungee'}} variant="h3">Sala de espera</Typography>
            {players.map((player) => (
                <Paper elevation={3} sx={{ p: 3, mb: 2 }} key={player.number} >
                    <Typography sx={{ fontSize: '1.4rem' }} variant="body1" color={player.number === playerNumber && 'green'}>
                        {player.id ? `Jogador ${player.number}` : `Aguardadando Jogador ${player.number} ...`}
                    </Typography>
                </Paper>
            ))}
            {playerNumber ?
                <Button color='success' size='large' sx={{display:'block', ml:'auto',fontSize:'1.3rem' }} disabled={numberOfPlayers >= 2 ? false : true} onClick={() => startGame()} variant="contained">Start</Button> :
                <Button color='success' size='large' sx={{display:'block', ml:'auto',fontSize:'1.3rem' }} disabled={numberOfPlayers >= 4 ? true : false} onClick={() => joinRoom()} variant="contained">Join</Button>
            }

        </>
    )
}
