import { getToken } from "./auth"

export const authHeader = async (): Promise<Record<string, string>> => {
  const userStr = localStorage.getItem("user")
  const token = await getToken()
  if (!userStr) return {}

  if (!token) {
    return {}
  }

  return { Authorization: `Bearer ${token}` }
} 