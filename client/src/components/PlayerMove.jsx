import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Circle } from './Circle'

export default function PlayerMove() {
    const moves = 4

    const [totalPalitinho, setTotalPalitinho] = useState(0);
    const [move, setMove] = useState(0);

    const [playerNumber, setPlayerNumber] = useState(1)
    const [numberOfPlayers, setnumberOfPlayers] = useState(4)
    const [playerScore, playerSetScore] = useState(2)

    const [total, setTotal] = useState(numberOfPlayers * 3 + 1)

    useEffect(() => {
        setTotal(numberOfPlayers * 3 + 1)
    }, [numberOfPlayers])

    const handleTotalPalitinho = (value) => {
        setTotalPalitinho(value)
    };

    const handleMove = (value) => {
        setMove(value)
    };

    const play = () => {
        console.log(move,totalPalitinho)
        // setnumberOfPlayers((i) => i - 1)
    }

    return (
        <>
            <Typography variant="h3" gutterBottom>Jogador {playerNumber}</Typography>
            <Typography variant="h5" gutterBottom>Pontuação: {playerScore}</Typography>
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
                        selected={totalPalitinho === i}
                        onClick={handleTotalPalitinho}
                    />
                ))}
            </Box>
            <Button onClick={() => play()} variant="contained">Play</Button>
        </>
    );
};


