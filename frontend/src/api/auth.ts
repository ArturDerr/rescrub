import axios, { type AxiosResponse } from "axios";
import { API_URL } from "../constants/constants";
import type { IConfirmEmail, IConfirmEmailResponse, IForgotPassword, IForgotPasswordResponse, ILogin, ILoginResponse, IRegister, IRegisterResponse } from "../interfaces";

let accessToken: string | null = localStorage.getItem("access_token")

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const register = async (payload: IRegister): Promise<IRegisterResponse> => {
    const response: AxiosResponse<IRegisterResponse> = await api.post(
        "/register/", 
        payload
    )
    return response.data
}

export const login = async (payload: ILogin): Promise<ILoginResponse> => {
    const response: AxiosResponse<ILoginResponse> = await api.post(
        "/login/", 
        payload
    )

    if (response.data.access_token) {
        accessToken = response.data.access_token
        localStorage.setItem("user", JSON.stringify(response.data))
        localStorage.setItem("access_token", accessToken)
    }

    return response.data
}

export const refreshToken = async (): Promise<string | null> => {
    try {
        const response = await api.post("/refresh/")
        accessToken = response.data.access_token
        if (accessToken) {
            localStorage.setItem("access_token", accessToken)
        }
        localStorage.setItem("user", JSON.stringify(response.data))
        return accessToken
    } catch {
        logout()
        return null
    }
}

export const getToken = async () => {
    if (!accessToken) accessToken = localStorage.getItem("access_token")
    if (!accessToken) return await refreshToken()
    try {
        const payload = JSON.parse(atob(accessToken.split(".")[1]))
        const isExpired = payload.exp * 1000 < Date.now()
        if (isExpired) return await refreshToken()
        return accessToken
    } catch {
        return await refreshToken()
    }        
}


export const forgotPassword = async (payload: IForgotPassword): Promise<IForgotPasswordResponse> => {
    const response: AxiosResponse<IForgotPasswordResponse> = await api.post(
        "/forgot-password/", 
        payload
    )

    return response.data
}

export const confirmEmail = async (payload: IConfirmEmail): Promise<IConfirmEmailResponse> => {
    const response: AxiosResponse<IConfirmEmailResponse> = await api.post(
        "/confirm-email/", 
        payload
    )

    return response.data
}

export const logout = (): void => {
    accessToken = ""
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
}

export const getCurrentUser = (): ILoginResponse | null => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
}

