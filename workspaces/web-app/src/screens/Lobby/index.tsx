import { Button } from '@/components/ui/button'

const Lobby = ({ lobby }) => {
  const { lobbyInfo, createRoom, joinRoom } = lobby
  if (!lobbyInfo) return null

  const { usersOnline, rooms, room, totalRooms, availableRooms } = lobbyInfo
  const roomCount = Object.keys(rooms).length

  return (
    <section className="grid gap-5">
      <div className="text-center">
        <h2>Users Online: {usersOnline}</h2>
        <h2>Total Rooms: {totalRooms}</h2>
      </div>
      {availableRooms?.length ? (
        <div className="grid gap-2">
          <h2>join an existing Room:</h2>
          {availableRooms.map((room, idx) => (
            <Button key={room.id} onClick={() => joinRoom(room.id)}>
              Room: {room.id.substring(24)}
            </Button>
          ))}
        </div>
      ) : (
        <Button onClick={createRoom}>Create Room</Button>
      )}
    </section>
  )
}

export default Lobby
