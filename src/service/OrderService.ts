import {Order} from "@/model/order/Order";
import axiosInstance from "@/config/axiosInstance";

export const createOrder = async (deliveryAddress: string, city: string,
                                    phoneNumber: string, instagramUsername: string): Promise<Order> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.post('/order/create', null, {
            params: { deliveryAddress, city, phoneNumber, instagramUsername},
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating order", error);
        throw error;
    }
}