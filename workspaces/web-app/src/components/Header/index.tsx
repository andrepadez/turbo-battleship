import useSocket from 'shared/useSocket'
import { cn } from 'shared/cn'

const Header = () => {
  const { isConnected } = useSocket()
  return (
    <header className="">
      <h1 className="w-full mt-3 text-xl font-bold text-center">BattleShip</h1>
      <div
        className={cn(
          'absolute right-5 top-4 w-5 h-5 rounded-full',
          isConnected ? ' bg-green-400' : ' bg-red-400'
        )}
      ></div>
    </header>
  )
}

export default Header
