import { Discount } from "@/model/discount/Discount";
import axiosInstance from "@/config/axiosInstance";

export const checkDiscountCode = async (discountCode: string): Promise<Discount> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get('/discount', {
            params: { discountCode },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error finding discount", error);
        throw error;
    }
}
