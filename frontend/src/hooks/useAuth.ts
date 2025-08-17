import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore"
import type { ILogin, ILoginResponse, IRegister, IRegisterResponse, IUser } from "../interfaces";
import { fetchMe, loginUser, registerUser } from "../api/auth";

export const useRegister = () => {
    const setAuth = useAuthStore((s) => s.setAuth)

    return useMutation<IRegisterResponse, Error, IRegister>({
        mutationFn: registerUser,
        onSuccess(data) {
            setAuth(data.user, data.token)
        },
    })
}

export const useLogin = () => {
    const { setAuth, setToken } = useAuthStore()

    return useMutation<ILoginResponse, Error, ILogin>({
        mutationFn: loginUser,
        onSuccess: async (data) => {
            setToken(data.access)

            // данные профиля
            const me: IUser = await fetchMe(data.access)
            setAuth(me, data.access)
        }
    })
}