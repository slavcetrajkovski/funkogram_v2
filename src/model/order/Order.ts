export interface Order {
    id: number;
    user_id: number;
    localDateTime: Date;
    deliveryAddress: string;
    city: string;
    phoneNumber: string;
    instagramUsername: string;
    orderStatus: string;
    totalPrice: number;
}