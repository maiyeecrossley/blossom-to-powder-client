import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

export const seasonIndex = async (locationId) => {
    try {
        const response = await axios.get(`${BASE_URL}/seasons/locations/`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}