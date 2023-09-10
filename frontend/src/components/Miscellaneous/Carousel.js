import React, { useState } from "react";

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };

    const nextSlide = () => {
        const numSlides = 3; // Replace with the total number of slides
        setCurrentSlide((prev) => Math.min(prev + 1, numSlides - 1));
    };

    return (
        <div className="carousel-container flex overflow-hidden">
        <div className="flex-none">
            <button
            className="w-8 h-8 bg-gray-300 flex items-center justify-center"
            onClick={prevSlide}
            >
            &lt;
            </button>
        </div>
        <div
            className="flex w-full transition-transform duration-300"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
            {/* Carousel items go here */}
            <img
            src="https://via.placeholder.com/300"
            alt="Image 1"
            className="w-48 h-32 object-cover"
            />
            <img
            src="https://via.placeholder.com/300"
            alt="Image 2"
            className="w-48 h-32 object-cover"
            />
            <img
            src="https://via.placeholder.com/300"
            alt="Image 3"
            className="w-48 h-32 object-cover"
            />
            {/* Add more images as needed */}
        </div>
        <div className="flex-none">
            <button
            className="w-8 h-8 bg-gray-300 flex items-center justify-center"
            onClick={nextSlide}
            >
            &gt;
            </button>
        </div>
        </div>
    );
};

export default Carousel;
