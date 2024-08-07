import {ProductDto} from "@/model/ProductDto";

export interface ProductList {
    products: ProductDto[];
    page: number;
    size: number;
}