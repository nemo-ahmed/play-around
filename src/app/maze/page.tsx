import {getPath} from '@/utils/findMazePath'
import clsx from 'clsx'
import React from 'react'

function Maze() {
  const grids = [
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
    ],
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {grids.map((arr, n) => (
        <div key={`maze-${n}`} className="border-[0.5px] border-zinc-900">
          {getPath(arr).map((group, i) => (
            <div key={`line-${i}`} className="flex">
              {group.map((cell, x) => (
                <div
                  key={`cell-${x}`}
                  className={clsx('size-6 border-[0.1px] border-zinc-900', {
                    'bg-zinc-400': cell === 0,
                    'bg-zinc-600': cell === 1,
                    'bg-green-600 ': cell === 9,
                  })}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Maze
