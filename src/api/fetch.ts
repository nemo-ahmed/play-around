async function genericFetch({url}: {url: string}) {
  const res = await fetch(url, {method: 'GET'})
  if (res.ok) {
    return res.json()
  }

  return Promise.reject(res)
}

export default genericFetch
