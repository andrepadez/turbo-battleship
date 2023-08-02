import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
// const URL = 'http://127.0.0.1:8001'
const URL = 'https://fly.io/apps/battleship-server'
const socket = io(URL)

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)
    if (!socket.connected) {
      socket.connect()
    }
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return { socket, isConnected }
}

export default useSocket
