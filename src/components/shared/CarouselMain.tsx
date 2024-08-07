"use client"
import {Carousel} from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import { images } from "@/data/CarouselImages";

export default function CarouselMain() {
    return (
        <Carousel>
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image.src}
                    alt={`Image ${index + 1}`}
                    layout="responsive"
                    className="w-full h-full object-cover"
                    width={image.width}
                    height={image.height}
                />
            ))}
        </Carousel>
    );
}