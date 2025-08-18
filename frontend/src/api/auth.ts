import axios from "axios";
import { API_URL } from "../constants/constants";
import type { ILogin, ILoginResponse, IRegister, IRegisterResponse, IUser } from "../interfaces";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// обработка ошибок 

const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.response?.data?.message || error.message || "Незвестная ошибка, попробуйте позже"
        throw new Error(message)
    }
    throw error
}

// регистрация 

export const registerUser = async (payload: IRegister): Promise<IRegisterResponse> => {
    try {
        const { data } = await api.post<IRegisterResponse>('/register/', payload)
        return data
    } catch (error) {
        handleError(error)
        throw error
    }
}

// логин 

export const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
    try {
        const { data } = await api.post<ILoginResponse>('/login/', payload)
        return data
        
    } catch (error) {
        handleError(error)
        throw error
    }
}

// получение данных пользователя 

export const fetchMe = async (token: string): Promise<IUser> => {
    try {
        const { data } = await api.get<IUser>('/me/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        return data
        
    } catch (error) {
        handleError(error)
        throw error
    }
  
}


