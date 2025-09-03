'use client'

import {gridValidation, getPath, REPLACING_NUMBER} from '@/utils/findMazePath'
import clsx from 'clsx'
import {motion} from 'motion/react'
import React, {useRef} from 'react'

function MazeComponent({grids}: {grids: number[][][]}) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="h-full">
      {grids.map((arr, n) => {
        const isValid = gridValidation([...(arr ?? [])])
        return (
          <motion.div
            initial={{opacity: 0}}
            whileInView={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            viewport={{once: true, root: ref}}
            key={`maze-${n}`}
            className="border-[0.5px] border-zinc-900 bg-amber-50 flex flex-col w-fit h-full my-4"
          >
            {getPath(arr).map((row, i) => {
              return (
                <div key={`line-${i}`} className="flex">
                  {row.map((cell, x) => {
                    const delay = (1 * (x + i + 1)) / 10
                    console.log(delay)
                    const xxx = {
                      [`${isValid && cell === 0}`]: 'var(--color-zinc-400)',
                      [`${isValid && cell === 1}`]: 'var(--color-zinc-600)',
                      [`${!isValid && cell === 0}`]: 'var(--color-red-900)',
                      [`${!isValid && cell === 1}`]: 'var(--color-red-700)',
                      [`${cell === REPLACING_NUMBER}`]:
                        'var(--color-green-600 )',
                    }
                    return (
                      <motion.div
                        initial={{backgroundColor: 'var(--color-zinc-600)'}}
                        whileInView={{
                          backgroundColor: xxx['true'],
                          transition: {
                            duration: 0.3,
                            delay,
                          },
                        }}
                        key={`cell-${x}`}
                        style={{width: 40, height: 40}}
                        className={clsx(
                          'min-h-10 min-w-10 border-[0.1px] border-zinc-900',
                          //   {
                          //     'bg-zinc-400': isValid && cell === 0,
                          //     'bg-zinc-600': isValid && cell === 1,
                          //     'bg-red-900': !isValid && cell === 0,
                          //     'bg-red-700': !isValid && cell === 1,
                          //     'bg-green-600 ': cell === REPLACING_NUMBER,
                          //   },
                        )}
                      />
                    )
                  })}
                </div>
              )
            })}
          </motion.div>
        )
      })}
    </div>
  )
}

export default MazeComponent
