export const authHeader = (): Record<string, string> => {
  const userStr = localStorage.getItem("user")
  if (!userStr) return {}

  try {
    const user = JSON.parse(userStr) as { access_token?: string }

    if (user && user.access_token) {
      return { Authorization: `Bearer ${user.access_token}` }
    }
  } catch {
    return {}
  }

  return {}
}