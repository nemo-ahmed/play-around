import type {SodukuPromiseReturn} from '@/types/soduku'

export async function fetchSoduku(rating?: string | string[]) {
  const url = new URL(`http://localhost:3000/api/soduku/random`)
  if (typeof rating === 'string') {
    url.searchParams.append('rating', rating)
  }
  const res = await fetch(url.toString())
  if (res.ok) {
    const data = await res.json()
    return data
  }

  Promise.reject(res.text())
}
