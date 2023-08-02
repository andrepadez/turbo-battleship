import { useState, useEffect } from 'react'
import useSocket from 'shared/useSocket'

const useLobby = () => {
  const { socket } = useSocket()
  const [lobbyInfo, setLobbyInfo] = useState(null)

  const { rooms = {} } = lobbyInfo || {}

  useEffect(() => {
    const setInfo = info => {
      const foundRoom = Object.entries(info.rooms).find(([id, room]) => {
        return room.player1 === socket.id || room.player2 === socket.id
      })

      const room = foundRoom && foundRoom[1]

      const totalRooms = Object.keys(info.rooms).length

      const availableRooms = Object.entries(info.rooms).reduce((result, [id]) => {
        const room = info.rooms[id]
        const { player1, player2 } = room
        if (player1 && !player2) {
          result.push(info.rooms[id])
        }
        return result
      }, [])

      setLobbyInfo({ ...info, room, totalRooms, availableRooms })
    }
    socket.on('lobby-info', setInfo)
    return () => {
      socket.off('lobby-info', setInfo)
    }
  })

  const createRoom = () => {
    socket.emit('create-room')
  }

  const joinRoom = (id: RoomID) => {
    socket.emit('join-room', id)
  }

  return { lobbyInfo, createRoom, joinRoom }
}

type RoomID = string

export default useLobby
