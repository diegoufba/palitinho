import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Circle } from './Circle'

export default function PlayerMove({ playersGuess, setPlayersGuess, ganhador, setGanhador, socket, players, setPlayers, setGameStart, playerNumber, setPlayerNumber, numberOfPlayers, setnumberOfPlayers, playerTurn, setPlayerTurn }) {
    const moves = 4
    const [total, setTotal] = useState(numberOfPlayers * 3 + 1)

    const [move, setMove] = useState(null);
    const [guessTotal, setGuessTotal] = useState(null);

    useEffect(() => {
        setTotal(numberOfPlayers * 3 + 1)
    }, [numberOfPlayers])

    const handleGuessTotal = (value) => {
        setGuessTotal(value)
    };

    const handleMove = (value) => {
        setMove(value)
    };

    const play = () => {
        socket.emit('jogada', playerNumber, move, guessTotal)

        setPlayerTurn(false)
    }

    return (
        <>
            <Typography variant="h3" gutterBottom>Jogador {playerNumber}</Typography>
            <Box mb={4}>
                {[...Array(moves)].map((e, i) => (
                    <Circle
                        key={i}
                        value={i}
                        selected={move === i}
                        onClick={handleMove}
                    />
                ))}
            </Box>
            <Box>
                {[...Array(total)].map((e, i) => (
                    <Circle
                        key={i}
                        value={i}
                        selected={guessTotal === i}
                        onClick={handleGuessTotal}
                        disabled={playersGuess.includes(i)}
                    />
                ))}
            </Box>
            <Button disabled={move === null || guessTotal === null} onClick={() => play()} variant="contained">Play</Button>
        </>
    );
};


