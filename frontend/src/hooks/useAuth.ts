import { useEffect, useState } from "react"
import { getToken } from "../api/auth"

export function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    (async () => {
      const token = await getToken()
      setIsAuth(!!token)
    })()
  }, []) 

  return isAuth
}