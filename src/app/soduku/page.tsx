import React from 'react'
import Cell from './cell'

function Page() {
  return (
    <section className="grid grid-cols-3 grid-rows-3 center size-[50dvw] border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
        <Cell key={`daddy-cell-${n}`} />
      ))}
    </section>
  )
}

export default Page
