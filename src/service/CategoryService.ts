import axiosInstance from "@/config/axiosInstance";

export const getAllCategories = async () => {
    try {
        const response =  await axiosInstance.get<string[]>(`/category/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories", error);
        throw error;
    }
}