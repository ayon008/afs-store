import React from 'react';
import default_image from "../../assets/images/Team/Group-1-3.png.webp"
import Image from 'next/image';

const TeamCard = ({ member }) => {
    const memberData = member?.acf;
    const name = memberData?.member_name || "Member Name";
    const jobTitle = memberData?.memer_job_role || "Job Title";
    const photoUrl = memberData?.primary_image?.url || default_image;
    const secondPhotoUrl = memberData?.casual_image?.url || photoUrl;

    return (
        <div className='text-white aspect-[351/484] bg-[#11111199] w-full h-auto group relative overflow-hidden rounded-sm'>
            {/* 1st Image */}
            <Image
                src={photoUrl}
                alt={name}
                className='
                    w-full h-full object-cover object-center absolute inset-0
                    transition-opacity duration-300
                    [transition-timing-function:cubic-bezier(.23,1,.32,1)]
                    opacity-100 group-hover:opacity-0
                '
                width={351}
                height={492}
            />
            {/* Hover Image */}
            <Image
                src={secondPhotoUrl}
                alt={name}
                className='
                    w-full h-full object-cover object-center absolute inset-0
                    transition-opacity duration-300
                    [transition-timing-function:cubic-bezier(.23,1,.32,1)]
                    opacity-0 group-hover:opacity-100
                '
                width={351}
                height={492}
            />

            <div className='absolute left-0 right-0 bottom-0 lg:px-4 px-[10px] pt-[10px] lg:pt-4 lg:pb-6 pb-[16px] z-10'>
                <div className='space-y-2'>
                    <p className='font-bold lg:text-[21px] text-base leading-[100%]'>{name}</p>
                    <p className='lg:text-lg text-sm font-medium leading-[125%]'>{jobTitle}</p>
                </div>
            </div>

            <div className='absolute left-0 right-0 bottom-0 lg:px-4 px-[10px] pt-[10px] lg:pt-4 lg:pb-6 pb-[16px] hidden group-hover:block backdrop-blur-[10px] z-30'>
                <div className='space-y-2'>
                    <p className='font-bold lg:text-[21px] text-base leading-[100%]'>{name}</p>
                    <p className='lg:text-lg text-sm font-medium lg:leading-[125%] leading-[100%]'>{jobTitle}</p>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
