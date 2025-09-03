import {getPath, gridValidation, REPLACING_NUMBER} from '@/utils/findMazePath'
import clsx from 'clsx'
import React from 'react'

function Maze() {
  const grids = [
    [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
    ],
    [
      [1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
    ],
    [
      [1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1],
    ],
    [
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1],
    ],
    [
      [0, 1, 1, 1],
      [0, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
    ],
    [
      [1, 0, 1, 1, 0, 1],
      [1, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [1, 1, 0, 1, 1, 1],
    ],
    [
      [0, 1, 1, 1],
      [0, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 1, 1],
    ],
    [
      [1, 0, 1, 1, 0, 1],
      [1, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [1, 1, 1, 0, 1, 1],
      [1, 1, 0, 0, 1, 1],
      [1, 1, 0, 1, 1, 1],
    ],
    [
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
    ],
    [
      [1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
    ],
    [
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 1, 0],
    ],
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-full">
      <h1>Mazes</h1>
      {grids.map((arr, n) => {
        const isValid = gridValidation([...arr])
        return (
          <div
            key={`maze-${n}`}
            className="border-[0.5px] border-zinc-900 bg-amber-50 flex flex-col w-fit h-full"
          >
            {getPath(arr).map((row, i) => {
              return (
                <div key={`line-${i}`} className="flex">
                  {row.map((cell, x) => (
                    <div
                      key={`cell-${x}`}
                      style={{width: 40, height: 40}}
                      className={clsx(
                        'min-h-10 min-w-10 border-[0.1px] border-zinc-900',
                        {
                          'bg-zinc-400': isValid && cell === 0,
                          'bg-zinc-600': isValid && cell === 1,
                          'bg-red-900': !isValid && cell === 0,
                          'bg-red-700': !isValid && cell === 1,
                          'bg-green-600 ': cell === REPLACING_NUMBER,
                        },
                      )}
                    />
                  ))}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Maze
