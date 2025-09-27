import type {SodukuTypeReturn} from '@/types/soduku'

export async function fetchSoduku(rating: string | string[] | undefined) {
  const url = new URL(`http://localhost:3000/api/soduku/random`)
  if (typeof rating === 'string') {
    url.searchParams.append('rating', rating)
  }
  return fetch(url.toString())
    .then(async res => {
      return (await res.json()) as SodukuTypeReturn
    })
    .catch(err => {
      console.error(err)
      return err
    })
}
