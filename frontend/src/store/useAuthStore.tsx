import { create } from "zustand";
import type { IAuthStore, ILogin, IRegister, IUser } from "../interfaces";
import { persist } from "zustand/middleware";
import { fetchMe, loginUser, registerUser } from "../api/auth";

export const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: (user, token) => set({ user, token }),
            setToken: (token) => set({ token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: "auth-storage"
        }
    )
)

export const registerAction = async (payload: IRegister) => {
    const data = await registerUser(payload)
    useAuthStore.getState().setAuth(data.user, data.token)
    return data
}

export const loginAction = async (payload: ILogin) => {
    const data = await loginUser(payload)
    useAuthStore.getState().setToken(data.access)
    return data
}

export const fetchMeAction = async () => {
    const { token } = useAuthStore.getState()

    if (!token) {
        throw new Error("Нет токена")
    }

    const user = await fetchMe(token)
    useAuthStore.getState().setAuth(user, token)
    return user
}
