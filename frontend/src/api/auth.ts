import { API_URL } from "../constants/constants";
import type { ILogin, ILoginResponse, IRegister, IRegisterResponse, IUser } from "../interfaces";

// обработка ошибок 

const errorsResponse = async <T>(response: Response): Promise<T> => {
    let data: any

    // сделать красивый вывод ошибки в alert позже
    try {
        data = await response.json()
    } catch {
        throw new Error("Некорректный ответ от сервера, попробуйте позже")
    }

    if (!response.ok) {
        const errorMessage = data?.message || data?.detail || "Незвестная ошибка, попробуйте позже"
        throw new Error(errorMessage)
    }   

    return data as T

}

// регистрация 

export const registerUser = async (payload: IRegister): Promise<IRegisterResponse> => {
    try {
        const response = await fetch(`${API_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        
        return await errorsResponse<IRegisterResponse>(response)
    } catch (error: any) {
        console.error("Ошибка регистрации", error)
        throw error
    }
}

// логин 

export const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
    try {
        const response = await fetch(`${API_URL}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        
        return await errorsResponse<ILoginResponse>(response)
    } catch (error: any) {
        console.error("Ошибка входа", error)
        throw error
    }
}

// получение данных пользователя 

export const fetchMe = async (token: string): Promise<IUser> => {
    try {
        const response = await fetch(`${API_URL}/me/`, {
            headers: { Authorization: `Bearer ${token}` },
        })

        return await errorsResponse<IUser>(response)
    } catch (error: any){
        console.error("Ошибка загрузки профиля", error)
        throw error
    }
  
  
}


