import React from 'react'
import cx from 'classnames'

const Ships = ({ ships }) => {
  return (
    <div className="absolute z-1000 w-full h-full">
      <div className="relative w-full h-full">
        {ships.map((ship, idx) => {
          const { length, positions, direction } = ship
          const [[startX, startY]] = positions
          const style = {
            marginLeft: `${2 * startX}rem`,
            marginTop: `${2 * startY}rem`,
            width: direction === 'horizontal' ? `${2 * length}rem` : `2rem`,
            height: direction === 'horizontal' ? `2rem` : `${2 * length}rem`,
          }
          return (
            <div key={idx}>
              <div key={idx} className="border-2 absolute bg-gray-500" style={style}>
                <div className="flex justify-center items-center h-full font-bold text-white">
                  {ship.length}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Ships
