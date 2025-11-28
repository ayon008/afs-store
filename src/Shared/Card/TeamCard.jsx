import React, { useState } from 'react';
import default_image from "../../assets/images/Team/Group-1-3.png.webp"
import Image from 'next/image';
import PopUp from "../../Shared/Team/PopUp"

const TeamCard = ({ member }) => {
    const memberData = member?.acf;
    const name = memberData?.member_name || "Member Name";
    const jobTitle = memberData?.memer_job_role || "Job Title";
    const photoUrl = memberData?.primary_image?.url || default_image;
    const secondPhotoUrl = memberData?.casual_image?.url || photoUrl;
    const pop_up = memberData?.popbtn_id === "hide" ? false : true;

    const [isOpen, setOpen] = useState(false);

    return (
        <div>
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

                <div className='absolute left-0 right-0 bottom-0 lg:px-4 px-[10px] pt-[10px] lg:pt-4 lg:pb-6 pb-[16px] group-hover:backdrop-blur-[10px] z-10'>
                    <div className='space-y-2'>
                        <p className='font-bold lg:text-[21px] text-base leading-[100%]'>{name}</p>
                        {/* <p className='lg:text-lg text-sm font-medium leading-[125%] group-hover:opacity-0 opacity-100'>{jobTitle}</p> */}
                        {
                            pop_up && <div onClick={() => setOpen(true)} className='flex items-center group-hover:opacity-100 opacity-0 border-white w-fit cursor-pointer border-b'>
                                <p className='lg:text-lg text-sm font-medium leading-[125%]'>VOIR PLUS</p>
                                <svg width="20" height="20" className='text-white' viewBox="0 0 24 24" fill="none">
                                    <path d="M19 5L5 19M19 5H6.4M19 5V17.6" stroke="white" strokeWidth="2" />
                                </svg>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {/* <PopUp isOpen={isOpen} /> */}
        </div>
    );
};

export default TeamCard;
