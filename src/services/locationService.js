import axios from "axios"
import { getToken } from "../utils/auth.js"

const BASE_URL = import.meta.env.VITE_API_URL

export const locationIndex = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/locations/`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}