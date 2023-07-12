import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Circle } from './Circle'
import Palito from './Palito';

export default function PlayerMove({totalPalito, playersGuess, setPlayersGuess, ganhador, setGanhador, socket, players, setPlayers, setGameStart, playerNumber, setPlayerNumber, numberOfPlayers, setnumberOfPlayers, playerTurn, setPlayerTurn }) {
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
        <Box>
            <Typography variant="h3" sx={{mb:4,fontFamily: 'Bungee'}} >Jogador {playerNumber}</Typography>
            <Typography variant="h4" sx={{mb:4}} >Escolha quantos palitinhos quer jogar</Typography>
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
            <Box sx={{ml:3}}><Palito number={move} /></Box>
            
            <Typography variant="h4" sx={{mb:4}} >Escolha quantos palitinhos tem no total</Typography>
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
            <Box sx={{ml:3,mt:4}}><Palito number={guessTotal} /></Box>
            <Button color='success' size='large' sx={{mt: 6,mb:3,ml:2,fontSize:'1.3rem'}}  disabled={move === null || guessTotal === null} onClick={() => play()} variant="contained">Play</Button>
        </Box>
    );
};


