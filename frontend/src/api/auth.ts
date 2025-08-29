import axios, { type AxiosResponse } from "axios";
import { API_URL } from "../constants/constants";
import type { IForgotPassword, IForgotPasswordResponse, ILogin, ILoginResponse, IRegister, IRegisterResponse } from "../interfaces";

// регистрация

export const register = async (payload: IRegister): Promise<IRegisterResponse> => {
    const response: AxiosResponse<IRegisterResponse> = await axios.post(
        `${API_URL}/register/`, 
        payload
    )
    return response.data
}

// логин 

export const login = async (payload: ILogin): Promise<ILoginResponse> => {
    const response: AxiosResponse<ILoginResponse> = await axios.post(
        `${API_URL}/login/`, 
        payload
    )

    if (response.data.access_token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data
}

// отправка письма для сброса пароля

export const forgotPassword = async (payload: IForgotPassword): Promise<IForgotPasswordResponse> => {
    const response: AxiosResponse<IForgotPasswordResponse> = await axios.post(
        `${API_URL}/forgot-password/`, 
        payload
    )

    return response.data
}

// выход из аккаунта

export const logout = (): void => {
    localStorage.removeItem("user")
}

// поолучение пользователя

export const getCurrentUser = (): ILoginResponse | null => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }

