import {Product} from "@/model/product/Product";

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}
