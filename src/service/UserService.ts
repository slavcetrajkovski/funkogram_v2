import axiosInstance from "@/config/axiosInstance";
import {UserDto} from "@/model/user/UserDto";
import {OrderDto} from "@/model/order/OrderDto";

export const signup = async (signUpData: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
        const response = await axiosInstance.post('/auth/signup', signUpData);
        return response.data;
    } catch (error) {
        console.error('Sign up error:', error);
        throw error;
    }
};

export const signin = async (signInData: { email: string; password: string }) => {
    try {
        const response = await axiosInstance.post('/auth/signin', signInData);
        return response.data;
    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
};

export const getUserFullName = async (): Promise<string> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user full name:', error);
        throw error;
    }
}

export const getUserDetails = async (): Promise<UserDto> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get('/user/details', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}

export const getUserOrderList = async (): Promise<OrderDto[]> => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get('/user/orders', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching user orders", error);
        throw error;
    }
}


