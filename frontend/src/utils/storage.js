export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function load(key) {
  const x = localStorage.getItem(key)
  return x ? JSON.parse(x) : null
}

export function del(key) {
  localStorage.removeItem(key)
}

export const CONFIG = {
  api: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  timeout: 5000,
  key: import.meta.env.VITE_APP_SECRET_KEY
}
