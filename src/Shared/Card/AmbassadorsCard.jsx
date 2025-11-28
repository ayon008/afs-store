import React from 'react';
import default_image from "../../assets/images/Team/Group-1-3.png.webp"
import Image from 'next/image';


const AmbassadorsCard = ({ data }) => {
    const profile = data?.acf?.profile;
    const url = profile?.url || default_image;
    const title = profile?.title || "";
    const country = data?.acf?.country;

    return (
        <div className='lg:h-[300px] h-auto flex lg:flex-row flex-col-reverse lg:items-stretch items-start rounded-[4px] overflow-hidden group relative shadow-[0_0_50px_10px_#0000000D]'>
            <div className='lg:w-1/2 w-full flex flex-col justify-between p-5'>
                <p className='text-lg font-bold uppercase leading-[24px] break-words'>{title}</p>
                <p className='text-base leading-[24px] text-[#00000080] font-semibold'>{country}</p>
                <div className='flex items-center gap-1 border-white border-b-[2px] lg:hidden'>
                    <span>
                        Voir plus
                    </span>
                    <svg width="18" height="18" className='font-bold text-[#00000080] mt-1' viewBox="0 0 24 24" fill="#00000080">
                        <path d="M19 5L5 19M19 5H6.4M19 5V17.6" stroke="#00000080" strokeWidth="2" />
                    </svg>
                </div>
            </div>
            <div className='lg:w-1/2 w-full'>
                <Image src={url} alt='' height={300} width={200} className='w-full lg:h-full h-[300px] object-cover grayscale' />
            </div>
            {/* Overlay */}
            <div className="absolute inset-4 group-hover:inset-0 bg-black/60 
                opacity-0 group-hover:opacity-100 
                transition-all duration-500 lg:flex hidden items-center justify-center text-white text-lg font-bold uppercase leading-[24px]">
                <div className='flex items-center group-hover:opacity-100 opacity-0 delay-300 transition-opacity duration-300 gap-1 border-white border-b-[2px]'>
                    <span>
                        Voir plus
                    </span>
                    <svg width="18" height="18" className='text-white font-bold' viewBox="0 0 24 24" fill="none">
                        <path d="M19 5L5 19M19 5H6.4M19 5V17.6" stroke="white" strokeWidth="2" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AmbassadorsCard;