export interface Discount {
    id: number;
    code: string;
    discountPercentage: number;
    isGlobal: boolean;
    discountExpirationDate: string;
    isDiscountPublished: boolean;
}