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

            <div className='absolute left-0 right-0 bottom-0 p-4 z-10'>
                <div className='px-4 pt-4'>
                    <p className='font-bold text-[21px]'>{name}</p>
                    <p className='text-lg font-medium'>{jobTitle}</p>
                </div>
            </div>

            <div className='absolute left-0 right-0 bottom-0 p-4 hidden group-hover:block backdrop-blur-[10px] z-30'>
                <div className='px-4 pt-4'>
                    <p className='font-bold text-[21px]'>{name}</p>
                    <p className='text-lg font-medium'>{jobTitle}</p>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
