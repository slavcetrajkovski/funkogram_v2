import React, { useState, useEffect } from 'react';
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

    const [deviceType, setDeviceType] = useState<string>('mobile');

    useEffect(() => {
        const updateDeviceType = () => {
            if (window.innerWidth >= 1024) setDeviceType('desktop');
            else if (window.innerWidth >= 464) setDeviceType('tablet');
            else setDeviceType('mobile');
        };
        updateDeviceType();

        window.addEventListener('resize', updateDeviceType);

        return () => window.removeEventListener('resize', updateDeviceType);
    }, []);

    return (
        <div className="relative mt-12 mx-auto max-w-screen-2xl">
            <h1 className="text-black text-center text-3xl font-bold mb-6">{title}</h1>
            <Carousel
                swipeable
                draggable
                responsive={responsive}
                ssr={false}
                infinite
                keyBoardControl
                customTransition="transform 0.5s ease-in-out"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                deviceType={deviceType}
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
