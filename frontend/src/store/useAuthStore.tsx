import { create } from "zustand";
import type { IAuthStore } from "../interfaces";
import { persist } from "zustand/middleware";

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