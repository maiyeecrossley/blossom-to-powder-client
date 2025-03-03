import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

export const register = async(formData) => {

    try {
        const response = await axios.post(`${BASE_URL}/auth/register/`, formData)
        
        return response.data
    } catch (error) {
        console.log(error)
        throw Error(error)
    }

}