import type {SodukuDifficulties} from '@/types/soduku'

async function fetchSoduku(difficulty?: SodukuDifficulties) {
  const url = new URL(`http://localhost:3000/api/soduku/random`)
  if (typeof difficulty === 'string') {
    url.searchParams.append('difficulty', difficulty)
  }
  const res = await fetch(url.toString())
  if (res.ok) {
    const data = await res.json()
    return data
  }

  Promise.reject(res.text())
}

export {fetchSoduku}
