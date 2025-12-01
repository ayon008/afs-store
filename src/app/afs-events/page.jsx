import Link from 'next/link';
import React from 'react';
import Events from "../afs-events/Events"

export const metadata = {
    title: 'AFS EVENTS - FRANCE US UK EU - AFS',
    description: "AFS Events all over the globe",
    openGraph: {
        title: 'AFS EVENTS - FRANCE US UK EU - AFS',
        description: "AFS Events all over the globe",
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/map`,
        siteName: 'AFS Foiling',
    },
};


const BreadCums = () => {
    return (
        <div className='uppercase'>
            <div className='font-bold text-sm text-[#999999]'>
                <Link className='inline' href={'/'}>Accueil</Link> / <span className='text-white'>MAP</span>
            </div>
        </div>
    )
}


const page = async () => {
    return (
        <div className='bg-[#111111] global-padding relative pt-4 min-h-screen text-white'>
            <BreadCums />
            <div className='lg:my-[80px] my-[40px]'>
                <h1 className='global-h1 text-center relative'>AFS Events</h1>
                <p className='text-center mt-4 lg:w-[40%] w-full text-lg leading-[22px] font-semibold mx-auto'>Découvrez tous les événements de nos marques, organisés par AFS.</p>
            </div>
            <Events />
        </div>
    );
};

export default page;