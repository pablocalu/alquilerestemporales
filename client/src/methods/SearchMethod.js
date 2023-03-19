import axios from "axios"

export const getPlaces = async (name, setSearchResult) => {
    
    try {
        const places = await axios.get(`/findplaces?name=${name}`).then(response => response.data)
        return places
    } catch (error) {
        throw error
    }
}