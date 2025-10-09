import React from 'react'

function Spinner({
  height,
  width,
  borderWidth = 8,
  color = 'green',
}: {
  height: number
  width: number
  borderWidth?: number
  color?: string
}) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl isolate relative overflow-hidden"
      style={{height: height, width: width}}
    >
      <div
        style={{
          height: (height < width ? width : height) * 3,
          width: (width < height ? height : width) * 3,
          backgroundImage: `conic-gradient(from 45deg, #6b728250, #6b728250 ,${color}, #6b728250, #6b728250, #6b728250, ${color}, #6b728250)`,
          animation: 'borderanimation 4s linear infinite',
        }}
        className="flex items-center justify-center isolate absolute z-10"
      />
      <div
        style={{
          height: height,
          width: width,
        }}
        // ? this bg clip is awesome
        className="flex items-center justify-center z-20 bg-eerie-black-200 border-4 rounded-2xl border-transparent bg-clip-content absolute"
      >
        asdasd asd {height} X {width}
      </div>
    </div>
  )
}

export default Spinner
