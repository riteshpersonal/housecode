"use client"
import ArrowLeft from "@/Icons/ArrowLeft";
import ArrowRight from "@/Icons/ArrowRight";
import Link from "next/link";
import React, { useState, useEffect } from "react";


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      alt: "Modern kitchen"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      alt: "Modern house exterior"
    },
    {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80",
      alt: "Cozy living room"
    },
    {
      image: "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      alt: "Luxurious bedroom"
    },
    {
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      alt: "Modern kitchen"
    },
   
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[92vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center bg-[black] bg-opacity-50">
      <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl text-white text-special sm:text-6xl font-bold text-center tracking-wide 2xl:text-7xl">We Make finding your <br /> dream <span className="">home </span> easy</h1>
            <p className="sm:text-xl font-normal mt-5 text-special text-center 2xl:text-2xl text-neutral-300">Explore our network of homes with flexible options and affoardable  <br /> pricing taiored to your lifestyle.</p>
            <Link href="/find-property" className="cursor-pointer px-8 py-2.5 mt-10 bg-white text-lg text-black font-semibold  rounded-lg">Find your home</Link>
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none transition duration-300"
      >
        <ArrowLeft className="text-3xl text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none transition duration-300"
      >
        <ArrowRight className="text-3xl text-gray-800" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-neutral-400"}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;