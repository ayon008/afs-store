'use client';

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import PARTNERS_DATA from "../constants/partners";
import Container from "./Container";
import Image from "next/image";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import Heading from "./Heading";
import BodyText from "./BodyText";
import { theme } from "../theme";

export default function Partners() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;

      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;

      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <div className={`min-h-screen bg-white ${theme.paddingBottomOnlyMd} overflow-hidden`}>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Text Section */}
        <Container className="md:w-1/2 p-6 flex flex-col md:justify-end">
  <Heading
    text="DESIGN PARTNERS"
    centered={false}
    size="text[22px]"
    color="text-[#888]"
  />

  {/* Heading with fixed space to avoid shift */}
  <div className="min-h-[120px]">
    <Heading
      text={PARTNERS_DATA[activeIndex].heading}
      size="text-[60px]"
      centered={false}
      color="text-black"
    />
  </div>

  {/* Description with fixed space */}
  <div className="mt-2 max-w-xl min-h-[220px] md:min-h-[150px]">
    <BodyText
      text={PARTNERS_DATA[activeIndex].description}
      centered={false}
      className="max-w-[450px]"
    />
  </div>
</Container>


        {/* Right Swiper Section */}
        <div className="md:w-1/2 relative flex items-center justify-center h-[60vh] md:min-h-[600px] md:h-[100vh]">
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            speed={2000}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-full relative"
          >
            {PARTNERS_DATA.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={member.image}
                    alt={member.heading}
                    fill
                    placeholder="blur"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation + Counter */}
            <div className="absolute bottom-0 left-0 z-10 w-3/4 md:w-auto">
              <div className="flex flex-row-reverse md:flex-col items-center md:items-start bg-lightGray text-white px-4 py-1 md:px-8 md:py-4 w-full">
                {/* Arrows */}
                <div className="flex   justify-end items-center gap-2 md:mb-4 w-full">
                  <button
                    ref={prevRef}
                    className="group bg-Gray h-10 w-10 flex items-center justify-center rounded-full hover:bg-black transition-colors cursor-pointer"
                  >
                    <GoArrowLeft className="text-black group-hover:text-white transition-colors" size={20} />
                  </button>
                  <button
                    ref={nextRef}
                    className="group bg-Gray h-10 w-10 flex items-center justify-center rounded-full hover:bg-black transition-colors cursor-pointer"
                  >
                    <GoArrowRight className="text-black group-hover:text-white transition-colors" size={20} />
                  </button>
                </div>

                {/* Slide Counter */}
                <div className="flex md:justify-between items-center w-full text-black text-90px font-semibold">
                  <span>{(activeIndex % PARTNERS_DATA.length) + 1}</span>
                  <span className="text-sm">/ {PARTNERS_DATA.length}</span>
                </div>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
