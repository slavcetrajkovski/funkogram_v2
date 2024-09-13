"use client"
import { Carousel } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import { CarouselImages } from "@/data/CarouselImages";

interface CarouselProps {
    desktopImages: CarouselImages[];
    mobileImages: CarouselImages[];
}

export default function CarouselMain({ desktopImages, mobileImages }: CarouselProps) {
    return (
        <>
            {/* Desktop view carousel */}
            <div className="hidden md:block">
                <Carousel autoplay={true} autoplayDelay={5000} loop={true} >
                    {desktopImages.map((image, index) => (
                        <a
                            key={index}
                            href={image.link}
                            rel="noopener noreferrer"
                        >
                            <Image
                                src={image.src}
                                alt={`Image ${index + 1}`}
                                layout="responsive"
                                className="object-cover"
                                width={image.width}
                                height={image.height}
                            />
                        </a>
                    ))}
                </Carousel>
            </div>

            {/* Mobile view carousel */}
            <div className="block md:hidden">
                <Carousel autoplay={true} autoplayDelay={5000} loop={true} >
                    {mobileImages.map((image, index) => (
                        <a
                            key={index}
                            href={image.link}
                            rel="noopener noreferrer"
                        >
                            <Image
                                src={image.src}
                                alt={`Image ${index + 1}`}
                                layout="responsive"
                                className="object-cover"
                                width={image.width}
                                height={image.height}
                            />
                        </a>
                    ))}
                </Carousel>
            </div>
        </>
    );
}
