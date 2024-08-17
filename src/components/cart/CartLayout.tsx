"use client"

import React, {useEffect, useState} from 'react';
import {CartItem} from "@/model/cart/CartItem";
import {getCartDetails, removeProductFromCart, updateCartItemQuantity} from "@/service/CartService";

export default function CartLayout() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const items = await getCartDetails();
                setCartItems(items);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const increaseQuantity = async (productId: number) => {
        const updatedCartItems = cartItems.map(item =>
            item.product.id === productId ? {...item, quantity: item.quantity + 1} : item
        );
        setCartItems(updatedCartItems);
        await updateCartItemQuantity(productId, updatedCartItems.find(item => item.product.id === productId)!.quantity);
    };

    const decreaseQuantity = async (productId: number) => {
        const updatedCartItems = cartItems.map(item =>
            item.product.id === productId && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item
        );
        setCartItems(updatedCartItems);
        await updateCartItemQuantity(productId, updatedCartItems.find(item => item.product.id === productId)!.quantity);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const handleRemoveFromCart = async (productId: number) => {
        try {
            await removeProductFromCart(productId);
            const updatedCartItems = cartItems.filter(item => item.product.id !== productId);
            setCartItems(updatedCartItems);
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    }

    return (
        <div className="container mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-6 text-black">Кошничка</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 max-h-[500px] overflow-y-auto">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.id}
                                 className="flex items-center border-b border-gray-300 pb-4 mb-4 bg-white p-4 rounded-lg">
                                <img src={`data:image/jpeg;base64,${item.product.imageUrl}`} alt={item.product.name}
                                     className="w-24 h-24 object-cover mr-4"/>
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-funkogram_red">{item.product.name}</h2>
                                    <p className="text-sm text-black font-semibold my-3">Цена: {item.product.price} ден</p>
                                    <div className="flex items-center mt-2">
                                        <button onClick={() => decreaseQuantity(item.product.id)}
                                                className="bg-funkogram_red text-white px-2 py-1 rounded-l">-
                                        </button>
                                        <span className="px-4 font-bold text-black">{item.quantity}</span>
                                        <button onClick={() => increaseQuantity(item.product.id)}
                                                className="bg-funkogram_red text-white px-2 py-1 rounded-r">+
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-funkogram_red">{(item.product.price * item.quantity)} ден</p>
                                    <button onClick={() => handleRemoveFromCart(item.product.id)} className="text-red-500 mt-2">Избриши</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-black text-center font-bold">Вашата кошничка е празна.</p>
                    )}
                </div>
                <div className="bg-funkogram_red p-6 rounded-lg shadow-lg text-white h-[300px] flex flex-col justify-between">
                    <h2 className="text-xl font-semibold mb-4">Вкупно во кошничка</h2>
                    <div className="flex justify-between mb-4">
                        <span className="font-bold">Тотал</span>
                        <span className="font-bold">{calculateTotal()} ден</span>
                    </div>
                    <a href="/order">
                        <button
                            className={`w-full bg-yellow-700 text-funkogram_red py-2 font-bold rounded-lg mt-4 hover:bg-yellow-300 ${calculateTotal() === 0 ?
                                'opacity-20 cursor-not-allowed' : ''}`}
                            disabled={calculateTotal() === 0}
                        >
                            Нарачај
                        </button>
                    </a>
                    <a href="/catalog">
                        <button className="w-full bg-gray-300 text-gray-700 py-2 font-bold rounded-lg mt-2 hover:bg-white">
                            Назад кон каталог
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
