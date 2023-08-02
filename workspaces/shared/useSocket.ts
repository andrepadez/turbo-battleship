import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
// const URL = 'http://localhost:8001'
const URL = 'https://ce67-2001-8a0-7f5b-7500-1e7e-eef1-5cad-22c8.ngrok-free.app'
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
