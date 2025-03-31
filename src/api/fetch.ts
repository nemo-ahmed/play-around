async function genericFetch<T>({url}: {url: string}): Promise<T> {
  const res = await fetch(url, {method: 'GET'})
  if (res.ok) {
    return res.json()
  }

  return Promise.reject(res)
}

export default genericFetch
