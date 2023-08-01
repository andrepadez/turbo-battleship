import useSocket from 'shared/useSocket'
import GameSetup from './GameSetup'

const GameRoom = ({ room }) => {
  const { socket } = useSocket()
  const { player1, player2 } = room
  const playerName = Object.keys(room).find(key => room[key] === socket.id && key)

  return (
    <div className="text-center">
      <h2>
        Welcome, <strong>{playerName}</strong>
      </h2>
      <h3>GameRoom {room.id.substring(24)}</h3>
      {player2 ? (
        <h3>
          <strong>...setup your game</strong>
          <GameSetup />
        </h3>
      ) : (
        <h3>
          ... waiting for <strong>player2</strong>
        </h3>
      )}
    </div>
  )
}

export default GameRoom
