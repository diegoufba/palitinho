const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } })

const PORT = 3001

const players = [
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
]

let numberOfPlayers = 0



io.on('connection', (socket) => {
    console.log('Socket criado:', socket.id)
    io.emit('players', players)

    socket.on('joinRoom', (room) => {
        // Se ainda tiver vaga (menos de 4 jogadores) e o jogador nao tiver entrado na sala
        if (numberOfPlayers < 4 && !players.find(player => player.id === socket.id)) {

            for (let player of players) {
                if (player.id === null) {
                    player.id = socket.id
                    console.log(`Jogador ${player.number} entrou (${player.id})`)
                    socket.join(room)
                    
                    numberOfPlayers++
                    io.emit('players', players)
                    break
                }
            }
        }
    })


    socket.on('disconnect', () => {

        for (let player of players) {
            if (player.id === socket.id) {
                console.log(`Jogador ${player.number} saiu (${player.id})`)

                player.id = null
                numberOfPlayers--
                io.emit('players', players)
                break
            }
        }
    });

})

server.listen(PORT, () => console.log('Server running...'))