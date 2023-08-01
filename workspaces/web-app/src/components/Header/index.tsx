import useSocket from 'shared/useSocket'
import { cn } from '@/lib/utils'

const Header = () => {
  const { isConnected } = useSocket()
  return (
    <header className="">
      <h1 className="w-full text-xl text-center font-bold mt-3">BattleShip</h1>
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
