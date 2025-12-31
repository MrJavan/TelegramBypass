export default {
  async fetch(request) {
    const url = new URL(request.url)
    const tgUrl = `https://api.telegram.org${url.pathname}${url.search}`

    return fetch(tgUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD'
        ? await request.arrayBuffer()
        : null,
    })
  }
}
