import axios, { type AxiosResponse } from "axios"
import { API_URL } from "../constants/constants"
import type { IAnalyticsResponse, ICheckData, ICheckDataResponse, IDeleteData, IDeleteDataResponse } from "../interfaces"
import { authHeader } from "./auth.header"

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const getAnalytics = async (): Promise<IAnalyticsResponse> => {
    const headers = await authHeader()
    const response: AxiosResponse<IAnalyticsResponse> = await axios.get(
        `${API_URL}/analytics/`,
        { headers }
    )
    return response.data
}

export const deleteData = async (payload: IDeleteData): Promise<IDeleteDataResponse> => {
    const response: AxiosResponse<IDeleteDataResponse> = await api.post(
        "/delete-data/", 
        payload
    )

    return response.data
}

export const checkData = async (payload: ICheckData): Promise<ICheckDataResponse> => {
    const response: AxiosResponse<ICheckDataResponse> = await api.post(
        "/check-data/", 
        payload
    )

    return response.data
}