'use server'
import {redirect} from 'next/navigation'

export async function createPost(formData: FormData) {
  console.log('formAction', formData)
  const url = new URL('/user', 'http://localhost:3000')

  for (const key of formData.keys()) {
    const element = formData.get(key)
    if (element !== null) url.searchParams.append(key, element.toString())
  }

  return redirect(url.toString())
}
