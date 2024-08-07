import axios from 'axios';
import { API_BASE_URL } from "@/config/config";
import { ProductDto } from "@/model/ProductDto";
import { Page } from '@/model/Page';

export const getProductDetails = async (id: number): Promise<ProductDto> => {
    try {
        const response = await axios.get<ProductDto>(`${API_BASE_URL}/product/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product", error);
        throw error;
    }
};

export const getAllProducts = async (page: number,
                                     size: number,
                                     searchFilter: string,
                                     categoryFilter: string,
                                     sortFilter: string,
                                     productStatus: string): Promise<Page<ProductDto>> => {
    try {
        const response = await axios.get<Page<ProductDto>>(`${API_BASE_URL}/products`, {
            params: { page, size, searchFilter, categoryFilter, sortFilter, productStatus }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products", error);
        throw error;
    }
};
