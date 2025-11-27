"use client";
import Image from 'next/image';
import React, { useState } from 'react';

const TeamImage = ({ src, text, hoverSrc }) => {
    return (
        <div className="relative w-full h-full group" id={text}>

            {/* Base Image */}
            <Image
                src={src}
                alt={text}
                placeholder='blur'
                loading="lazy"
                className="
                    rounded-md 
                    transition-opacity duration-500
                    [transition-timing-function:cubic-bezier(.23,1,.32,1)]
                    opacity-100 w-full group-hover:opacity-0
                "
            />

            {/* Hover Image */}
            <Image
                src={hoverSrc}
                alt={text}
                placeholder='blur'
                loading="lazy"
                className="
                    rounded-md absolute inset-0 
                    transition-opacity duration-500
                    [transition-timing-function:cubic-bezier(.23,1,.32,1)]
                    opacity-0 w-full group-hover:opacity-100
                "
            />

            {/* Text */}
            <p className='absolute left-1/2 -translate-x-1/2 top-[40%] -translate-y-[40%]
                group-hover:top-[70%] group-hover:-translate-y-[70%]
                group-hover:mix-blend-difference
                transition-all duration-500
                [transition-timing-function:cubic-bezier(.23,1,.32,1)]
                text-center text-white text-[50px] font-semibold leading-[110%] z-20 mix-blend-normal'>
                {text}
            </p>
        </div>
    );
};

export default TeamImage;
