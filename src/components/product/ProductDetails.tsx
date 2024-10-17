"use client";

import {ProductDto} from "@/model/product/ProductDto";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {
    getCategoryStyle, getProductDescription,
    getProductStatusFunkoDesc,
    getProductStatusShirtDesc,
    getStatusColor,
    getStatusText,
} from "@/data/Mapper";
import {addProductToCart} from "@/service/CartService";
import {useState} from "react";
import ToastMessage from "@/components/shared/ToastMessage";

export default function ProductDetails({product}: { product: ProductDto }) {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [error, setError] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const statusToDisplay = product?.deleted ? "SOLD_OUT" : product?.productStatus;

    const handleAddToCart = async () => {
        try {
            if (product) {
                await addProductToCart(product.id, 1);
                setToastMessage("Успешно додадено во кошничка!");
                setError(false);
                setIsAddedToCart(true);
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            setToastMessage("Мора да бидете најавени!");
            setError(true);
        }
    };

    const productStatusDescription =
        product.productType === "SHIRT"
            ? getProductStatusShirtDesc(product?.productStatus, product?.deleted)
            : getProductStatusFunkoDesc(product?.productStatus, product?.deleted);

    const productDescription = getProductDescription(product?.productType);

    return (
        <div className="bg-gray-100 text-black">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <h2 className="text-3xl font-bold mb-2">{product?.name}</h2>
                        <div className="relative">
                            <img
                                src={`data:image/jpeg;base64,${product?.imageUrl}`}
                                alt="Product"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                            <span
                                className={`text-s text-white rounded-b-full font-semibold ml-2 px-4 py-4 absolute top-0 right-10 ${getStatusColor(
                                    statusToDisplay
                                )}`}
                            >
                                {getStatusText(statusToDisplay)}
                            </span>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <div
                            className={`rounded-lg p-4 mb-4 font-bold text-white ${getStatusColor(
                                statusToDisplay
                            )}`}
                        >
                            {productStatusDescription}
                        </div>

                        <div className="bg-white w-full px-4 py-8 rounded-lg shadow-md">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold">Цена: </span>
                                <span className="text-2xl font-bold">{product?.price} ден</span>
                            </div>

                            <span className="text-2xl font-bold">Опис</span>
                            <ul className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 mt-2">
                                {productDescription.map((desc, index) => (
                                    <li key={index} className="mb-2 flex items-start">
                                        <span className="mr-2 text-funkogram_red">•</span>
                                        {desc}
                                    </li>
                                ))}
                            </ul>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold mb-2">Категории</h3>
                                <div className="flex flex-wrap space-x-2">
                                    {product?.categories.map((category) => (
                                        <span
                                            key={category.id}
                                            className={`px-4 py-2 font-semibold italic ${getCategoryStyle(
                                                category.name
                                            )} text-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2`}
                                        >
                                            {category.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {isAddedToCart ? (
                                <button
                                    disabled
                                    className="bg-green-600 flex gap-2 items-center text-white px-6 py-2 rounded-md cursor-not-allowed"
                                >
                                    <FontAwesomeIcon
                                        icon={faCheckCircle as IconProp}
                                        className="mr-2"
                                    />
                                    Додадено
                                </button>
                            ) : (
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-funkogram_red flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-6"
                                >
                                    <FontAwesomeIcon
                                        icon={faCartPlus as IconProp}
                                        className="mr-2"
                                    />
                                    Додај во кошничка
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {toastMessage && (
                <ToastMessage
                    message={toastMessage}
                    error={error}
                    duration={2001}
                    onClose={() => setToastMessage(null)}
                />
            )}
        </div>
    );
}
