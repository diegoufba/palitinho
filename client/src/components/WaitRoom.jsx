import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import io from 'socket.io-client'

export default function WaitRoom({ socket }) {

    const [players, setPlayers] = useState([
        {
            id: null,
            number: 1,
        },
        {
            id: null,
            number: 2,
        },
        {
            id: null,
            number: 3,
        },
        {
            id: null,
            number: 4,
        }
    ])

    socket.on('players', (players) => {
        setPlayers(players)
    })

    socket.on('receive-message', (message) => {
        console.log(message)
    })

    const joinRoom = () => {
        socket.emit('joinRoom', 'room01')
    }

    const sendMensage = () => {
        socket.emit('mensagem', 'kkkk')
    }


    return (
        <>
            <Typography variant="h3" gutterBottom>Sala de espera</Typography>
            {players.map((player) => (
                <Box key={player.number}>
                    <Typography sx={{ fontSize: '1.4rem' }} variant="body1" gutterBottom>
                        {player.id ? `Jogador ${player.number}` : `Aguardadando Jogador ${player.number} ...`}
                    </Typography>
                </Box>
            ))}
            <Button sx={{ mr: 2 }} onClick={() => joinRoom()} variant="contained">Start</Button>
            <Button onClick={() => sendMensage()} variant="contained">Mensagem</Button>
        </>
    )
}
