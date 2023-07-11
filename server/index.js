const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } })

const PORT = 3001

const room = 'room'

const players = [
    {
        id: null,
        number: 1,
        score: 0,
        move: 0,
        guessTotal: 0
    },
    {
        id: null,
        number: 2,
        score: 0,
        move: 0,
        guessTotal: 0
    },
    {
        id: null,
        number: 3,
        score: 0,
        move: 0,
        guessTotal: 0
    },
    {
        id: null,
        number: 4,
        score: 0,
        move: 0,
        guessTotal: 0
    }
]

let numberOfPlayers = 0

let turn = 0



io.on('connection', (socket) => {
    console.log('Socket criado:', socket.id)

    io.emit('players', players)
    io.emit('numberOfPlayers', numberOfPlayers)


    socket.on('joinRoom', () => {
        // Se ainda tiver vaga (menos de 4 jogadores) e o jogador nao tiver entrado na sala
        if (numberOfPlayers < 4 && !players.find(player => player.id === socket.id)) {

            for (let player of players) {
                if (player.id === null) {
                    player.id = socket.id
                    console.log(`Jogador ${player.number} entrou (${player.id})`)
                    socket.join(room)

                    numberOfPlayers++
                    io.emit('players', players)
                    io.emit('numberOfPlayers', numberOfPlayers)
                    socket.emit('playerNumber', player.number)
                    break
                }
            }
        }
    })

    socket.on('startGame', () => {
        if (numberOfPlayers >= 2) {
            io.emit('startGameOk')

            // io.emit('turnControl', 1)
            for (let i = 0; i < 4; i++) {
                if (players[i].id) {
                    io.emit('turnControl', i + 1)
                    break
                }
                //end turn
            }
        }
    })

    socket.on('jogada', (playerNumber, move, guessTotal) => {
        players[playerNumber - 1].move = move
        players[playerNumber - 1].guessTotal = guessTotal

        io.emit('players', players)

        for (let i = playerNumber; i < 4; i++) {
            if (players[i].id) {
                io.emit('turnControl', i + 1)
                break
            }
            //end turn
        }
    })


    socket.on('disconnect', () => {

        for (let player of players) {
            if (player.id === socket.id) {
                console.log(`Jogador ${player.number} saiu (${player.id})`)

                player.id = null
                numberOfPlayers--
                io.emit('numberOfPlayers', numberOfPlayers)
                io.emit('players', players)
                break
            }
        }
    });

})

server.listen(PORT, () => console.log('Server running...'))