import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Circle } from './Circle'

export default function PlayerMove({ socket, players, setPlayers, setGameStart, playerNumber, setPlayerNumber, numberOfPlayers, setnumberOfPlayers,playerTurn,setPlayerTurn }) {
    const moves = 4
    const [total, setTotal] = useState(numberOfPlayers * 3 + 1)

    const [guessTotal, setGuessTotal] = useState(0);
    const [move, setMove] = useState(0);

    const [playerScore, playerSetScore] = useState(2)


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
        console.log(move,guessTotal)
        // setnumberOfPlayers((i) => i - 1)
        socket.emit('jogada',playerNumber,move,guessTotal)
        setPlayerTurn(false)
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
                        selected={guessTotal === i}
                        onClick={handleGuessTotal}
                    />
                ))}
            </Box>
            <Button onClick={() => play()} variant="contained">Play</Button>
        </>
    );
};


