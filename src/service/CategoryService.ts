import axios from "axios";
import {API_BASE_URL} from "@/config/config";

export const getAllCategories = async () => {
    try {
        const response =  await axios.get<string[]>(`${API_BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories", error);
        throw error;
    }
}