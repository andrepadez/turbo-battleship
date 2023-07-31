import http from 'node:http'
import { Server } from 'socket.io'
const server = http.createServer((req, res) => {
  res.end('cool')
})
const { PORT } = process.env
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
})

server.listen(PORT, () => console.log('server listening on port:', PORT))

const sockets = new Set()
// setInterval(() => console.log('sockets', sockets.size), 1000)

io.on('connection', socket => {
  console.log('user connected', socket.id)
  sockets.add(socket.id)
  socket.emit('welcome', 'welcome man')

  socket.on('disconnect', () => {
    sockets.delete(socket.id)
    console.log('user disconnected', socket.id)
  })
})
