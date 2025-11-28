import React from 'react';
import default_image from "../../assets/images/Team/Group-1-3.png.webp"
import Image from 'next/image';


const AmbassadorsCard = ({ data }) => {
    console.log(data);
    const profile = data?.acf?.profile;
    const url = profile?.url || default_image;
    const title = profile?.title || "";
    const country = data?.acf?.country;
    console.log(country);


    return (
        <div className='h-[300px] flex items-stretch rounded-[4px] overflow-hidden group relative'>
            <div className='w-1/2 flex flex-col justify-between p-5'>
                <p className='text-lg font-bold uppercase leading-[24px] break-words'>{title}</p>
                <p className='text-base leading-[24px] text-[#333333] font-semibold'>{country}</p>
            </div>
            <div className='w-1/2'>
                <Image src={url} alt='' height={300} width={200} className='w-full h-full object-cover grayscale' />
            </div>
            {/* Overlay */}
            <div className='absolute inset-2 group-hover:inset-0 bg-black/50 group-hover:opacity-100 opacity-0'></div>
        </div>
    );
};

export default AmbassadorsCard;