import axios from "axios"

export const getPlaces = async (name) => {
    
    try {
        return await axios.get(`/findplaces?name=${name}`).then(response => response.data)
    } catch (error) {
        throw error
    }
}