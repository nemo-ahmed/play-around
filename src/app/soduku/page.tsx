import {SODUKU_DIFFICULTIES} from '@/consts/soduku'

import type {SodukuDifficulties} from '@/types/soduku'
import Link from 'next/link'
import {redirect} from 'next/navigation'
import {IoShuffle} from 'react-icons/io5'

async function Page({searchParams}: PageProps<'/soduku'>) {
  const difficulty = await searchParams
    .then(value => value.difficulty as SodukuDifficulties)
    .catch(() => undefined)
  if (difficulty) {
    redirect('/' + difficulty)
  }
  return (
    <div className="flex flex-col justify-around">
      {/* <Active isVisible={!isPlaying}> */}
      <div className="flex flex-col gap-5 items-center justify-center bg-eerie-black/80">
        <pre className="font-medium">Select Difficulty</pre>
        <div className="flex items-center gap-2 justify-center flex-wrap">
          {SODUKU_DIFFICULTIES.map(dif => (
            <Link
              key={dif}
              href={'/soduku/' + dif}
              type="button"
              className="capitalize w-24 h-8 rounded-xl p-5 border-2 border-eerie-black-300 dark:border-eerie-black-700 transition-colors hover:bg-eerie-black-300 dark:hover:bg-eerie-black-700 flex items-center justify-center"
              aria-label={'Start game'}
            >
              {dif}
            </Link>
          ))}
          <Link
            key="random"
            href="/soduku/random"
            type="button"
            className="capitalize w-24 h-8 rounded-xl p-5 border-2 border-eerie-black-300 dark:border-eerie-black-700 transition-colors hover:bg-eerie-black-300 dark:hover:bg-eerie-black-700 flex items-center justify-center"
            aria-label={'Start game'}
          >
            <IoShuffle size={24} fontWeight={500} />
          </Link>
        </div>
      </div>
      {/* </Active> */}
    </div>
  )
}

export default Page
