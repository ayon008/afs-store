'use client';
import { useState } from "react";
import Image from "next/image";
import Container from "./Container";
import { theme } from "../theme";
import Heading from "./Heading";
import BodyText from "./BodyText";
import { RxCaretDown } from "react-icons/rx";
import useMediaQuery from "./hooks/useMediaQuery";
import useFetch from "./hooks/useFetch";
import SkeletonLoader from "./utils/SkeletonLoader";

export default function Experience() {
  const isDesktop = useMediaQuery("(min-width: 992px)");
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: experienceData, loading, error } = useFetch("/api/experience");

  const handleMobileToggle = (index) => {
    if (index !== activeIndex) setActiveIndex(index);
  };

  const handleDesktopHover = (index) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <Container className={`min-h-screen bg-charcoal ${theme.paddingVertical}`}>
        <div className="flex flex-col gap-10">
          {/* Mobile skeleton */}
          {!isDesktop && (
            <div className="flex flex-col gap-6">
              <SkeletonLoader className="h-20 w-3/4" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <SkeletonLoader className="h-6 w-full" />
                  <SkeletonLoader className="h-40 w-full" />
                </div>
              ))}
            </div>
          )}

          {/* Desktop skeleton */}
          {isDesktop && (
            <div className="flex flex-col lg:flex-row-reverse gap-10 xl:gap-20 items-stretch h-full">
              <div className="w-full lg:w-1/2 space-y-6 py-6">
                <SkeletonLoader className="h-16 w-3/4" />
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <SkeletonLoader className="h-10 w-2/3" />
                    <SkeletonLoader className="h-16 w-full" />
                  </div>
                ))}
              </div>
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <SkeletonLoader className="h-[500px] w-full" />
              </div>
            </div>
          )}
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={`min-h-screen bg-charcoal ${theme.paddingVertical}`}>
        <p className="text-red-500">Error loading experience data.</p>
      </Container>
    );
  }

  // ✅ Actual content once data is loaded
  return (
    <Container className={`min-h-screen bg-charcoal ${theme.paddingVertical}`}>
      <div className="flex flex-col gap-10">
        {/* Mobile layout */}
        {!isDesktop && (
          <div className="flex flex-col gap-6">
            <div className="w-full">
              <Heading
                text="THE ALPAGO EXPERIENCE"
                centered={false}
                className="mb-0 leading-none"
                size="text-[50px] md:text-[60px]"
                
              />
            </div>

            {experienceData.map((exp, index) => {
              const isOpen = activeIndex === index;
              return (
                <div key={index} className="bg-charcoal pt-4">
                  <button
                    onClick={() => handleMobileToggle(index)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <Heading
                      text={exp.heading}
                      size="text-2xl"
                      centered={false}
                      color={isOpen ? "text-white" : "text-white/40"}
                    />
                    <RxCaretDown
                      size={30}
                      className={`transform transition-transform duration-300 ${
                        isOpen ? "text-white rotate-180" : "text-white/40"
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      isOpen ? "max-h-[1000px] opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}
                  >
                    <BodyText
                      text={exp.body}
                      centered={false}
                      color="text-white"
                      className="max-w-xl"
                    />
                    <div className="mt-4">
                      <Image
                        src={exp.image}
                        alt={exp.heading}
                        width={800}
                        height={400}
                        className="w-full h-auto object-contain transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Desktop layout */}
        {isDesktop && (
          <div className="flex flex-col lg:flex-row-reverse gap-10 xl:gap-20 items-stretch h-screen">
            <div className="w-full lg:w-1/2 flex flex-col justify-between py-6">
              <div className="w-full">
                <Heading
                  text="THE ALPAGO EXPERIENCE"
                  centered={false}
                  color="text-white"
                  className="mb-8"
                />
              </div>

              {experienceData.map((exp, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => handleDesktopHover(index)}
                    onClick={() => handleDesktopHover(index)}
                    className="cursor-pointer transition-all duration-300"
                  >
                    <Heading
                      text={exp.heading}
                      size="text-50px"
                      centered={false}
                      color={isActive ? "text-white" : "text-white/40"}
                      className="transition-colors duration-300"
                    />
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isActive ? "opacity-100 max-h-[300px] mt-2" : "opacity-0 max-h-0"
                      }`}
                    >
                      <div className="min-h-[80px]">
                        <BodyText
                          text={exp.body}
                          centered={false}
                          color="text-white"
                          className="max-w-xl"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-end items-center">
              {experienceData[activeIndex] && (
                <Image
                  src={experienceData[activeIndex].image}
                  alt={experienceData[activeIndex].heading}
                  className="w-full h-auto object-contain transition-all duration-500"
                  width={1000}
                  height={600}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
