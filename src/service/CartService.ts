import axiosInstance from "@/config/axiosInstance";
import {CartItem} from "@/model/cart/CartItem";

export const addProductToCart = async (productId: number, quantity: number): Promise<void> => {
    try {
        const token = localStorage.getItem("token");
        await axiosInstance.post('/cart/add', null, {
            params: { productId, quantity },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error adding product to cart: ', error);
        throw error;
    }
};

export const removeProductFromCart = async (productId: number): Promise<void> => {
    try {
        const token = localStorage.getItem("token");
        await axiosInstance.post('/cart/remove', null, {
            params: { productId },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error removing product from cart: ', error);
        throw error;
    }
};

export const getCartDetails = async (): Promise<CartItem[]> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get('/cart', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching cart details', error);
        throw error;
    }
};

export const updateCartItemQuantity = async (productId: number, quantity: number): Promise<void> => {
    try {
        const token = localStorage.getItem("token");
        await axiosInstance.post('/cart/update', null, {
            params: { productId, quantity },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating cart item quantity: ', error);
        throw error;
    }
};
