"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import default_image from "../../assets/images/Team/Group-1-3.png.webp"

const TeamCard = ({ member }) => {
    const memberData = member?.acf;
    const name = memberData?.member_name || "Member Name";
    const first_name = memberData?.first_name || "First Name";
    const last_name = memberData?.last_name || "Last Name";
    const jobTitle = memberData?.memer_job_role || "Job Title";
    const photoUrl = memberData?.primary_image?.url || default_image;
    const secondPhotoUrl = memberData?.casual_image?.url || photoUrl;
    const [hoverImg, setHoverImg] = useState(photoUrl);
    const popUp = memberData?.popbtn_id === "hidden" ? false : true;

    return (
        <div onMouseEnter={() => setHoverImg(secondPhotoUrl)} onMouseLeave={() => setHoverImg(photoUrl)} className='h-auto w-full relative rounded-sm overflow-hidden group text-white aspect-[351/492]'>
            <Image src={hoverImg} height={492} width={351} alt={name} className='w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-all duration-500 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] z-10 aspect-[351/492]' />
            <div className='absolute left-0 right-0 bottom-0 pb-8 z-10'>
                <div className='px-4 pt-4'>
                    <p className='font-bold text-[21px]'>{name}</p>
                    <p className='text-lg font-medium'>{jobTitle}</p>
                </div>
            </div>
            <div className='absolute left-0 right-0 bottom-0 pb-8 hidden group-hover:block backdrop-blur-[10px] z-30'>
                <div className='px-4 pt-4'>
                    <p className='font-bold text-[21px]'>{name}</p>
                    <p className='text-lg font-medium'>{jobTitle}</p>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;