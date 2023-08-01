import crypto from 'node:crypto'

const sockets = new Set()
const rooms: any = {}

const lobbyInfo = () => ({
  usersOnline: sockets.size,
  rooms,
})

export const setupSocket = (socket: any, io: any) => {
  console.log('user connected', socket.id)
  sockets.add(socket.id)
  io.emit('lobby-info', lobbyInfo())

  socket.on('create-room', () => {
    const roomId = crypto.randomUUID()
    rooms[roomId] = {
      id: roomId,
      player1: socket.id,
      player2: undefined,
    }
    io.emit('lobby-info', lobbyInfo())
  })

  socket.on('join-room', (roomId: string) => {
    if (!rooms[roomId]) return
    rooms[roomId].player2 = socket.id
    io.emit('lobby-info', lobbyInfo())
  })

  socket.on('disconnect', () => {
    sockets.delete(socket.id)
    console.log('user disconnected', socket.id)

    Object.entries(rooms).forEach(([roomId, room]) => {
      const { player1, player2 } = room as any
      if ([player1, player2].includes(socket.id)) {
        delete rooms[roomId]
      }
    })

    io.emit('lobby-info', lobbyInfo())
  })
}
