"use client"

import React, {useState, useEffect, FormEvent} from 'react';
import {CartItem} from "@/model/cart/CartItem";
import {getCartDetails} from "@/service/CartService";
import {getUserDetails} from "@/service/UserService";
import ToastMessage from "@/components/shared/ToastMessage";
import {createOrder} from "@/service/OrderService";
import Spinner from "@/components/shared/Spinner";
import {checkDiscountCode} from "@/service/DiscountService";
import {Discount} from "@/model/discount/Discount";

export default function OrderConfirmationLayout() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [city, setCity] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [instagramProfile, setInstagramProfile] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [discountCode, setDiscountCode] = useState("");
    const [discountError, setDiscountError] = useState<string | null>(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = await getUserDetails();
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
            } catch (error) {
                console.error("Error fetching user details");
            }
        }

        fetchUserDetails();
    }, []);

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

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [cartItems]);

    const hasShirtInCart = cartItems.some(
        (item) => item.product.productType === "SHIRT"
    );

    const validateDiscountCode = async () => {
        setLoading(true);
        setTimeout(async () => {
            try {
                const discount = await checkDiscountCode(discountCode);
                if (discount) {
                    setDiscountError(null);
                    setToastMessage("Попустот е успешно применет!");
                    setTotalPrice((prevTotal) => prevTotal - (prevTotal * (discount.discountPercentage / 100)));
                } else {
                    setDiscountError("Кодот за попуст не постои!");
                }
            } catch (error) {
                setDiscountError("Кодот за попуст не постои или е истечен!");
            }
            setLoading(false);
        }, 2000); // Adding a 2-second delay for the loading state
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!deliveryAddress || !city || !phoneNumber || !instagramProfile) {
            setError("Сите полиња мора да бидат пополнети!");
            return;
        }

        const phoneRegex = /^(07|3897|\+3897)\d{7}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setError("Телефонскиот број е невалиден. Телефонскиот број мора да започне со 07, 3897 или +3897 и да има 9 цифри.");
            return;
        }

        try {
            setLoading(true);
            await createOrder(deliveryAddress, city, phoneNumber, instagramProfile, description, discountCode);
            setTimeout(() => {
                setToastMessage("Вашата нарачка е успешно примена! Проверете го вашиот е-меил!");
                setLoading(false);
                setError(null);
                setTimeout(() => {
                    window.location.href = '/catalog';
                }, 3000);
            }, 2000);
        } catch (error) {
            console.error("Error submitting the order:", error);
            setError("Настана грешка при поднесувањето на нарачката. Обидете се повторно!");
        }
    };

    return (
        <div className="container mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-6 text-black">Потврда за нарачка</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-black">Детали за нарачка</h2>
                    {cartItems.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {cartItems.map(item => (
                                <div key={item.id}
                                     className="flex justify-between items-center border-b border-gray-300 pb-2">
                                    <span className="text-lg font-semibold text-black">{item.product.name}</span>
                                    <span className="text-lg text-black">x {item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-black text-center font-bold">Немате избрано производи кои се спремни за
                            нарачка.</p>
                    )}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-bold text-black">Вкупно:</span>
                        <span className="text-lg text-black">{totalPrice} ден</span>
                    </div>
                </div>

                <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-black">Имаш купон за попуст?</h2>
                    <div className="flex flex-col">
                        <label className="text-black font-semibold">Код</label>
                        <input
                            type="text"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="bg-gray-100 text-black p-2 rounded-lg"
                            placeholder="Внеси код за попуст"
                        />
                        <button
                            type="button"
                            onClick={validateDiscountCode}
                            className={`bg-funkogram_red text-white py-2 font-bold rounded-lg mt-4 hover:bg-red-700
                            ${totalPrice === 0 ? 'opacity-20 cursor-not-allowed' : ''}`}
                            disabled={totalPrice === 0}
                        >
                            {loading ? <Spinner/> : 'Примени попуст'}
                        </button>
                        {discountError && <div className="text-red-500 text-sm mt-2">{discountError}</div>}
                    </div>
                </div>
            </div>

            <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg mt-10">
                <h2 className="text-xl font-semibold mb-4 text-black">Ваши детали</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    <div className="flex flex-col">
                        <label className="text-black font-semibold">Име *</label>
                        <input
                            type="text"
                            value={firstName}
                            readOnly
                            className="bg-gray-200 text-black p-2 rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-black font-semibold">Презиме *</label>
                        <input
                            type="text"
                            value={lastName}
                            readOnly
                            className="bg-gray-200 text-black p-2 rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-black font-semibold">Емаил *</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="bg-gray-200 text-black p-2 rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-black font-semibold">Адреса за испорака *</label>
                        <input
                            type="text"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className="bg-gray-100 text-black p-2 rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-black font-semibold">Град *</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="bg-gray-100 text-black p-2 rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-black font-semibold">Телефонски број *</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="bg-gray-100 text-black p-2 rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-black font-semibold">Instagram профил *</label>
                        <input
                            type="text"
                            value={instagramProfile}
                            onChange={(e) => setInstagramProfile(e.target.value)}
                            className="bg-gray-100 text-black p-2 rounded-lg"
                        />
                    </div>
                    {hasShirtInCart && (
                        <div className="flex flex-col">
                            <label className="text-black font-semibold">Величина на маица</label>
                            <select
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-gray-100 text-black p-2 rounded-lg"
                            >
                                <option value="" disabled>Одбери</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>
                    )}
                    <button
                        type="submit"
                        className={`bg-funkogram_red text-white py-2 font-bold rounded-lg mt-4 hover:bg-red-700
                            ${totalPrice === 0 ? 'opacity-20 cursor-not-allowed' : ''}`}
                        disabled={totalPrice === 0}
                    >
                        {loading ? <Spinner/> : 'Потврди нарачка'}
                    </button>
                </form>
            </div>

            {toastMessage && (
                <ToastMessage
                    message={toastMessage}
                    error={false}
                    duration={3000}
                    onClose={() => setToastMessage(null)}
                />
            )}
        </div>
    );
}
