const http = require('node:http')
import { Server } from 'socket.io'
import { setupSocket } from './sockets'

const server = http.createServer((req, res) => {
  res.end('cool')
})
const { PORT = 3000 } = process.env
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

server.listen(PORT, () => console.log('server listening on port:', PORT))

io.on('connection', socket => setupSocket(socket, io))
