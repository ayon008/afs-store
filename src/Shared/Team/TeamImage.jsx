"use client";
import Image from 'next/image';
import React, { useState } from 'react';

const TeamImage = ({ src, text, hoverSrc }) => {
    const [isHovered, setIsHovered] = useState(src);
    return (
        <div className='relative w-fit h-fit group'>
            <Image src={isHovered} onMouseEnter={() => setIsHovered(hoverSrc)} onMouseLeave={() => setIsHovered(src)} alt={text} className="mx-auto rounded-md z-10" />
            <p className='absolute left-1/2 -translate-x-1/2 top-[40%] -translate-y-[40%] group-hover:top-[70%] group-hover:-translate-y-[70%] group-hover:mix-blend-difference transition-all duration-200 text-center text-white text-[50px] font-semibold leading-[110%] z-20 text mix-blend-normal'>{text}</p>
        </div>
    );
};

export default TeamImage;