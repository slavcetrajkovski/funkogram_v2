import {Category} from "@/model/Category";

export interface ProductDto {
    name: string;
    imageUrl: Blob;
    price: number;
    stock: number;
    productStatus: string;
    categories: Category[];
}