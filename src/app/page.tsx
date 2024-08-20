import Image from 'next/image';
import React from "react";
import CarouselMain from "@/components/shared/CarouselMain";

const Home = () => {
    const imageUrls = [
        {src: '/shrek1.jpg', width: 1200, height: 800},  // First row, one photo
        {src: '/rocky.png', width: 600, height: 400},   // Second row, two photos
        {src: '/rocky.png', width: 400, height: 1200},  // Third row, four photos
        {src: '/rocky.png', width: 400, height: 1200},
        {src: '/rocky.png', width: 400, height: 1200},
        {src: '/rocky.png', width: 400, height: 1200},
        {src: '/rocky.png', width: 1000, height: 600},  // Fourth row, three longer photos
        {src: '/rocky.png', width: 1000, height: 600},
        {src: '/rocky.png', width: 1000, height: 600},
        {src: '/rocky.png', width: 600, height: 400},   // Fifth row, two photos
        {src: '/rocky.png', width: 600, height: 400},
        {src: '/rocky.png', width: 400, height: 600},   // Sixth row, four photos
        {src: '/rocky.png', width: 400, height: 600},
        {src: '/rocky.png', width: 400, height: 600},
        {src: '/rocky.png', width: 400, height: 600},
        {src: '/rocky.png', width: 400, height: 600},
    ];

    return (
        <>
            {/*<Layout>*/}
            {/*    <p><Link className="text-black" href="/signup">Sign Up</Link></p>*/}
            {/*    <p><Link className="text-black" href="/signin">Sign In</Link></p>*/}
            {/*</Layout>*/}
            <CarouselMain/>
            <div className="container mx-auto px-20 py-8">
                {/* Second row (Two photos) */}
                <div className="grid grid-cols-2 gap-20 mb-10">
                    {imageUrls.slice(1, 3).map((image, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden">
                            <Image
                                src={image.src}
                                alt={`Image ${index + 2}`}
                                layout="responsive"
                                width={image.width}
                                height={image.height}
                            />
                        </div>
                    ))}
                </div>

                {/* Third row (Four photos) */}
                <div className="grid grid-cols-4 gap-20 mb-10">
                    {imageUrls.slice(3, 7).map((image, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden">
                            <Image
                                src={image.src}
                                alt={`Image ${index + 3}`}
                                layout="responsive"
                                width={image.width}
                                height={image.height}
                            />
                        </div>
                    ))}
                </div>

                {/* Fourth row (Three longer photos) */}
                <div className="grid grid-cols-4 gap-20 mb-10">
                    {imageUrls.slice(7, 11).map((image, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden">
                            <Image
                                src={image.src}
                                alt={`Image ${index + 7}`}
                                layout="responsive"
                                width={image.width}
                                height={image.height}
                            />
                        </div>
                    ))}
                </div>

                {/* Fifth row (Two photos) */}
                <div className="grid grid-cols-2 gap-20 mb-10">
                    {imageUrls.slice(10, 12).map((image, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden">
                            <Image
                                src={image.src}
                                alt={`Image ${index + 2}`}
                                layout="responsive"
                                width={image.width}
                                height={image.height}
                            />
                        </div>
                    ))}
                </div>

                {/* Sixth row (Four photos) */}
                <div className="grid grid-cols-2 gap-20 mb-10">
                    {imageUrls.slice(12, 16).map((image, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden">
                            <Image
                                src={image.src}
                                alt={`Image ${index + 12}`}
                                layout="responsive"
                                width={image.width}
                                height={image.height}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
