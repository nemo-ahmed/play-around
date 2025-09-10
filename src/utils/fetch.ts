async function genericFetch<T>({url}: {url: string}): Promise<T> {
  const res = await fetch(url, {method: 'GET', cache: 'force-cache'})
  if (res.ok) {
    return res.json()
  }

  return Promise.reject(res)
}

export default genericFetch
