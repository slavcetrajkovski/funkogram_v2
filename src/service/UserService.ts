import axios from "axios";
import { API_BASE_URL } from "@/config/config";
import { text } from "stream/consumers";

export const getProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/test/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
            return response.data;
    } catch (error) {
        console.log("Error fetching user profile");
        throw error;
    }
}

export const signup = async (state: { username: string; email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, state, {
            headers: {
                "Content-Type": "application/json"
            }
        });
            return response.data;
    } catch (error) {
        console.error("Error signing up user", error);
        throw error;
    }
}

export const signin = async (state: { username: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, state, {
            headers: {
                "Content-Type": "application/json"
            }
        });
            return response.data;
    } catch (error) {
        console.error("Error signing in user", error);
        throw error;
    }
}

export const getUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/test/user`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        });
            return response.data;
    } catch (error) {
        console.error('Error fetching content', error);
        throw error;
    }
}
