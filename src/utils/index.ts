export const handleRequest = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body: Record<string, unknown> | null,
  setError: (error: string | null) => void,
  successCallback: (data: T) => void,
) => {
  setError(null)

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : null,
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Request failed')
    }

    const data: T = await res.json()
    successCallback(data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    setError(error.message)
  }
}

export const generateTempId = () =>
  Date.now().toString() + Math.random().toString(36).substring(2, 8)
