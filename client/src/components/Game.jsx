import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Circle } from './Circle';
import { Grid } from '@mui/material';
import Palito from './Palito';
import Paper from '@mui/material/Paper';

export default function Game({ playersGuess, setPlayersGuess, ganhador, setGanhador, socket, players, setPlayers, setGameStart, playerNumber, setPlayerNumber, numberOfPlayers, setnumberOfPlayers, playerTurn, setPlayerTurn }) {


  const newTurn = () => {
    socket.emit('newTurn')
  }

  const endGame = () => {
    socket.emit('endGame')
  }

  const handlePlayerClick = () => {

  }

  return (
    <>
      <Typography variant="h3" sx={{ mb: 4, fontFamily: 'Bungee', textAlign: 'center' }}  >Palitinho Game</Typography>

        <Grid container style={{ height: '70vh' }}>
          <Grid item xs={4}>
            {/* <div style={{ background: 'red', height: '100%', width: '100%' }} /> */}
          </Grid>
          <Grid item xs={4}>

            {players[1].id ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Typography variant="h5" gutterBottom>
                {`P${players[1].number} - Score: ${players[1].score}`}
              </Typography>

              {ganhador && players[1].move !== null ?
                <Palito number={players[1].move} /> :
                <Box
                  component="img"
                  alt="The house from the offer."
                  src="/hand2.png"
                  border={players[1].number === playerNumber ? 'solid 2px #2196f3' : ''}
                />}

              <Typography sx={{ fontSize: '2rem' }} variant="h5" gutterBottom>
                {players[1].guessTotal !== null && `${players[1].guessTotal}`}
              </Typography>

            </Box>
              : null}

          </Grid>
          <Grid item xs={4}>
            {/* <div style={{ background: 'blue', height: '100%', width: '100%' }} /> */}
          </Grid>
          <Grid item xs={4}>

            {players[2].id ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: '2rem' }} variant="h5" gutterBottom>
                {players[2].guessTotal !== null && `${players[2].guessTotal}`}
              </Typography>

              {ganhador && players[2].move !== null ?
                <Palito number={players[2].move} /> :
                <Box
                  component="img"
                  alt="The house from the offer."
                  src="/hand3.png"
                  border={players[2].number === playerNumber ? 'solid 2px #2196f3' : ''}
                />}

              <Typography variant="h5" gutterBottom>
                {`P${players[2].number} - Score: ${players[2].score}`}
              </Typography>
            </Box>
              : null}

          </Grid>
          <Grid item xs={4}>
            {ganhador && <Typography sx={{ mb: 4, textAlign: 'center' }} variant="h4" >{ganhador !== -1 ? `Ganhador: Jogador ${ganhador}` : 'Sem ganhadores'}</Typography>}
          </Grid>
          <Grid item xs={4}>

            {players[3].id ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: '2rem' }} variant="h5" gutterBottom>
                {players[3].guessTotal !== null && `${players[3].guessTotal}`}
              </Typography>

              {ganhador && players[3].move !== null ?
                <Palito number={players[3].move} /> :
                <Box
                  component="img"
                  alt="The house from the offer."
                  src="/hand4.png"
                  border={players[3].number === playerNumber ? 'solid 2px #2196f3' : ''}
                />}

              <Typography variant="h5" gutterBottom>
                {`P${players[3].number} - Score: ${players[3].score}`}
              </Typography>
            </Box>
              : null}

          </Grid>
          <Grid item xs={4}>
            {/* <div style={{ background: 'pink', height: '100%', width: '100%' }} /> */}
          </Grid>
          <Grid item xs={4}>

            {players[0].id ? <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: '2rem' }} variant="h5" gutterBottom>
                {players[0].guessTotal !== null && `${players[0].guessTotal}`}
              </Typography>

              {ganhador && players[0].move !== null ?
                <Palito number={players[0].move} /> :
                <Box
                  component="img"
                  alt="The house from the offer."
                  src="/hand1.png"
                  border={players[0].number === playerNumber ? 'solid 2px #2196f3' : ''}
                />}

              <Typography variant="h5" gutterBottom>
                {`P${players[0].number} - Score: ${players[0].score}`}
              </Typography>
            </Box>
              : null}


          </Grid>
          <Grid item xs={4}>
            {/* <div style={{ background: 'gray', height: '100%', width: '100%' }} /> */}
          </Grid>
        </Grid>

      <Box sx={{ textAlign: 'center' }}>
        {playerNumber && ganhador && <Button size='large' sx={{ mt: 3, fontSize: '1.3rem' }} color='success' onClick={() => newTurn()} variant="contained">Nova Rodada</Button>}
        {playerNumber && ganhador && <Button size='large' color='error' sx={{ mt: 3, ml: 3, fontSize: '1.3rem' }} onClick={() => endGame()} variant="contained">End Game</Button>}
      </Box>
    </>
  )
}
