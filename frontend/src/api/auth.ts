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

export const forgotPassword = async (payload: IForgotPassword): Promise<IForgotPasswordResponse> => {
    const response: AxiosResponse<IForgotPasswordResponse> = await axios.post(
        `${API_URL}/forgot-password/`, 
        payload
    )

    return response.data
}

export const confirmEmail = async (payload: IConfirmEmail): Promise<IConfirmEmailResponse> => {
    const response: AxiosResponse<IConfirmEmailResponse> = await axios.post(
        `${API_URL}/confirm-email/`, 
        payload
    )

    return response.data
}

export const logout = (): void => {
    accessToken = null
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
}

export const getCurrentUser = (): ILoginResponse | null => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }

