import {ProductDto} from "@/model/product/ProductDto";

export interface ProductList {
    products: ProductDto[];
    page: number;
    size: number;
}