'use client'

import React, {useState} from 'react'

function Page() {
  const [range, setRange] = useState(0.5)
  return (
    <div>
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
    </div>
  )
}

export default Page
