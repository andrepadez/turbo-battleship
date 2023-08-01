import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
const URL = 'http://localhost:8001'
const socket = io(URL)

const subscriptions = {}

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [listeners, setListeners] = useState({})
  useEffect(() => {
    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)
    if (!socket.connected) {
      socket.connect()
    }
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    // socket.on('welcome', args => {
    //   console.log('got message from server')
    //   console.log('args', args)
    // })
    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return { socket, isConnected }
}

export default useSocket
