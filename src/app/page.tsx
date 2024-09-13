"use client"

import React, {useEffect, useState} from "react";
import CarouselMain from "@/components/shared/CarouselMain";
import ProductCarousel from "@/components/product/ProductCarousel";
import {getProductsForCarousel} from "@/service/ProductService";
import Spinner from "@/components/shared/Spinner";
import {
    funkoImagesResponsiveSlider1,
    funkoImagesResponsiveSlider2,
    funkoImagesSlider1,
    funkoImagesSlider2
} from "@/data/CarouselImages";

const Home = () => {
    const [newArrivalProducts, setNewArrivalProducts] = useState([]);
    const [preorderProducts, setPreorderProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarouselProducts = async () => {
            try {
                const [newArrival, preorder] = await Promise.all([
                    getProductsForCarousel("NEW_ARRIVAL"),
                    getProductsForCarousel("PREORDER")
                ]);

                setNewArrivalProducts(newArrival);
                setPreorderProducts(preorder);
            } catch (error) {
                console.error("Error fetching carousel products:", error);
                setError("Моментално нема продукти");
            } finally {
                setLoading(false);
            }
        };

        fetchCarouselProducts();
    }, []);

    return (
        <>
            <CarouselMain desktopImages={funkoImagesSlider1} mobileImages={funkoImagesResponsiveSlider1} />

            {loading ? (
                <Spinner position="mt-10"/>
            ) : error ? (
                <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
                <ProductCarousel products={newArrivalProducts} title="НАЈНОВИ"/>
            )}

            <CarouselMain desktopImages={funkoImagesSlider2} mobileImages={funkoImagesResponsiveSlider2} />

            {loading ? (
                <Spinner position="mt-10"/>
            ) : error ? (
                <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
                <ProductCarousel products={preorderProducts} title="ПРЕДНАРАЧКИ"/>
            )}
        </>
    );
};

export default Home;
