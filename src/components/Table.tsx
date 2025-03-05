import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import React from 'react'

function Table() {
  const {data, onScroll} = useInfiniteScroll({
    data: Array(2000)
      .fill(null)
      .map((_, i) => i),
  })
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Head</th>
        </tr>
      </thead>
      <tbody
        className="flex flex-col h-[calc(100dvh-250px)] overflow-auto"
        onScroll={onScroll}
      >
        {data.map((n, _, arr) => (
          <tr key={n}>
            <td
              className={
                _ === 0 || arr[_ - 1] === n - 1
                  ? 'text-green-600'
                  : 'text-red-600'
              }
            >
              {n}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
