'use client'

import React, {useState} from 'react'

import Spinner from './Spinner'

function Page() {
  const [range, setRange] = useState(0.5)
  const [height, setHeight] = useState(200)
  const [width, setWidth] = useState(200)
  const [border, setBorder] = useState(8)
  return (
    <div className="flex flex-col overflow-auto items-center gap-4">
      <input
        type="range"
        name="move"
        id="move"
        aria-label="move"
        className="accent-outer-space-400 dark:accent-outer-space-600"
        min={0}
        max={1}
        step={0.1}
        value={range}
        onChange={e => setRange(e.currentTarget.valueAsNumber)}
      />
      <div className="flex">
        <div className="relative flex size-40">
          <div className="size-40 rounded-full bg-amber-400" />
          <div className="w-40 h-20 absolute top-0 z-10 rounded-t-full bg-amber-400" />
        </div>
        <div
          className="relative flex size-40 -ml-20"
          style={{marginLeft: -160 * range}}
        >
          <div className="size-40 rounded-full bg-amber-950" />
          <div className="w-40 h-20 absolute bottom-0 z-10 rounded-b-full bg-amber-950" />
        </div>
      </div>
      <div className=" flex flex-col gap-5 items-center justify-center">
        <input
          type="range"
          name="width"
          id="width"
          aria-label="width"
          className="accent-outer-space-400 dark:accent-outer-space-600 w-44"
          min={20}
          max={800}
          step={20}
          value={height}
          onChange={e => setHeight(e.currentTarget.valueAsNumber)}
        />
        <div className="flex gap-2 items-center justify-center">
          <div className="w-[1.5rem] h-36 relative overflow-hidden">
            <input
              type="range"
              name="height"
              id="height"
              aria-label="height"
              className="absolute accent-outer-space-400 dark:accent-outer-space-600 w-36 top-0 left-[1.4rem]"
              style={{
                transform: 'rotate(90deg)',
                transformOrigin: 'left top',
              }}
              min={20}
              max={800}
              step={20}
              value={width}
              onChange={e => setWidth(e.currentTarget.valueAsNumber)}
            />
          </div>
          <div
            className="spinner-border"
            style={{
              height,
              width,
            }}
          >
            asdasd asd {height} X {width}
          </div>
        </div>
      </div>
      <input
        type="range"
        name="border"
        id="border"
        aria-label="border"
        className="accent-outer-space-400 dark:accent-outer-space-600 "
        step={1}
        min={0}
        value={border}
        max={width}
        onChange={e => setBorder(e.currentTarget.valueAsNumber)}
      />
      <Spinner height={height} width={width} borderWidth={border} />
    </div>
  )
}

export default Page
