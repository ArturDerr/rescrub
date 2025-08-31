import axios, { type AxiosResponse } from "axios"
import { API_URL } from "../constants/constants"
import type { IAnalyticsResponse } from "../interfaces"

export const getAnalytics = async (): Promise<IAnalyticsResponse> => {
    const response: AxiosResponse<IAnalyticsResponse> = await axios.get(
        `${API_URL}/analytics/`
    )
    return response.data
}