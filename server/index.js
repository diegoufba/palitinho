const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } })

const PORT = 3001

const room = 'room'

let playersGuess = []

const players = [
    {
        id: null,
        number: 1,
        score: 0,
        move: null,
        guessTotal: null
    },
    {
        id: null,
        number: 2,
        score: 0,
        move: null,
        guessTotal: null
    },
    {
        id: null,
        number: 3,
        score: 0,
        move: null,
        guessTotal: null
    },
    {
        id: null,
        number: 4,
        score: 0,
        move: null,
        guessTotal: null
    }
]

let numberOfPlayers = 0

let gameStart = false



io.on('connection', (socket) => {
    console.log('Socket criado:', socket.id)

    io.emit('players', players)
    io.emit('numberOfPlayers', numberOfPlayers)

    if (gameStart) {
        io.emit('startGameOk')
    }


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
            gameStart = true
        }

        // Faz o primeiro jogador ativo jogar
        for (let i = 0; i < 4; i++) {
            if (players[i].id) {
                io.emit('turnControl', i + 1)
                break
            }
        }
    })

    socket.on('newTurn', () => {

        // Apaga os movimentos da jogada anterior
        for (let player of players) {
            if (player.id) {
                player.move = null
                player.guessTotal = null
            }
        }
        io.emit('players', players)
        io.emit('playersGuess', playersGuess)
        io.emit('resetGanhador')

        // Faz o primeiro jogador ativo jogar
        for (let i = 0; i < 4; i++) {
            if (players[i].id) {
                io.emit('turnControl', i + 1)
                break
            }
        }
    })

    function verificarAcertos() {
        // Filtra apenas os jogadores ativos
        const jogadoresAtivos = players.filter(player => player.id !== null);

        // Soma os movimentos dos jogadores ativos
        const totalMoves = jogadoresAtivos.reduce((acc, player) => acc + player.move, 0);

        // Verifica se algum jogador ativo acertou
        const acerto = jogadoresAtivos.find(player => player.guessTotal === totalMoves);

        // Retorna o número do jogador ativo que acertou ou -1 se nenhum jogador ativo acertou
        return acerto ? acerto.number : -1;
    }

    socket.on('jogada', (playerNumber, move, guessTotal) => {
        players[playerNumber - 1].move = move
        players[playerNumber - 1].guessTotal = guessTotal

        playersGuess.push(guessTotal)

        io.emit('playersGuess', playersGuess)
        io.emit('players', players)

        for (let i = playerNumber; i < 4; i++) {
            if (players[i].id) {
                io.emit('turnControl', i + 1)
                return
            }
        }

        const ganhador = verificarAcertos()
        if (ganhador != -1) {
            players[ganhador - 1].score++
        }
        playersGuess = []
        io.emit('endTurn', ganhador)
        io.emit('players', players)
    })

    function endGame() {
        gameStart = false
        for (let player of players) {
            if (player.id) {
                player.move = null
                player.guessTotal = null
                player.score = 0
            }
        }
        io.emit('players', players)
        io.emit('numberOfPlayers', numberOfPlayers)
        io.emit('resetGanhador')
        io.emit('endGameOk')
        playersGuess = []
        io.emit('playersGuess', playersGuess)
    }

    socket.on('endGame', () => {
        endGame()
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

        if (numberOfPlayers < 2) {
           endGame()
        }
    });

})

server.listen(PORT, () => console.log('Server running...'))