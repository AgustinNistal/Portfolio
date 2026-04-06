const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"

export async function apiRequest(path: string, options: RequestInit = {}) {
  const { headers, ...restOptions } = options;
  const res = await fetch(`${API_URL}${path}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  })

  if (!res.ok) {
    const text = await res.text();
    console.error(`API Error ${res.status} on ${path}:`, text);
    throw new Error(text);
  }

  return res.json()
}