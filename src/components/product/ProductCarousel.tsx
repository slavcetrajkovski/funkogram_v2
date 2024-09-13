import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from './ProductCard';
import { ProductDto } from '@/model/product/ProductDto';

interface ProductCarouselProps {
    products: ProductDto[];
    title: string;
}

export default function ProductCarousel({ products, title }: ProductCarouselProps) {
    const responsive = {
        desktop: {
            breakpoint: { max: 4000, min: 1393 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1392, min: 1039 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 800, min: 671 },
            items: 2,
        },
    };

    const getDeviceType = (): string => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1024) return 'desktop';
            if (window.innerWidth >= 464) return 'tablet';
        }
        return 'mobile';
    };

    return (
        <div className="relative mt-12 mx-auto max-w-screen-2xl">
            <h1 className="text-black text-center text-3xl font-bold mb-6">{title}</h1>
            <Carousel
                swipeable
                draggable
                responsive={responsive}
                ssr
                infinite
                keyBoardControl
                customTransition="transform 0.5s ease-in-out" // Updated for smoother transition
                transitionDuration={500} // Longer duration for smoother effect
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                deviceType={getDeviceType()}
                itemClass="carousel-item-padding-40-px"
            >
                {products.map((product, index) => (
                    <div key={index} className="p-2">
                        <ProductCard product={product} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
