import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="h-[50vh] md:h-[85vh] w-full bg-[#eef8f5] relative">
        <div className="absolute w-full h-full">
            <Image src="/hero-bg.webp" alt="hero background" width={2000} height={2000} className="w-full h-full object-contain object-bottom" />
        </div>
        <div className="relative  top-[13%] flex flex-col items-center justify-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-center tracking-wide 2xl:text-7xl">We Make finding your <br /> dream <span className="text-primary">home </span> easy</h1>
            <p className="sm:text-xl font-normal mt-5 text-center 2xl:text-2xl text-gray-500">Explore our network of homes with flexible options and affoardable  <br /> pricing taiored to your lifestyle.</p>
            <Link href="/find-property" className="cursor-pointer px-8 py-2.5 mt-10 bg-primary text-lg text-white font-semibold  rounded-lg">Find your home</Link>
        </div>
    </section>
  )
}

export default Hero