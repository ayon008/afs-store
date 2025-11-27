import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import teamImage from "../../assets/images/Team/1A4A82C8-D73A-4826-B627-E39C082F1173.jpg.webp"
import Team from '../../Shared/Team/Team';

export const metadata = {
    title: 'AFS L’équipe - AFS Foiling',
    description: 'Meet the AFS team: designers, developers, and athletes behind our foiling gear and products.'
}

const BreadCums = () => {
    return (
        <div className='uppercase'>
            <div className='font-bold text-sm text-[#999999]'>
                <Link className='inline' href={'/'}>Accueil</Link> / <span className='text-black'> L’équipe</span>
            </div>
        </div>
    )
}


const page = () => {
    return (
        <div className='bg-white global-padding relative pt-4'>
            <div>
                <BreadCums />
                <div className='lg:my-[80px] my-[40px]'>
                    <h1 className='global-h1 text-center relative'>L'équipe Foil And Co.</h1>
                </div>
                <div className='flex items-start gap-10 global-margin'>
                    <div className='w-[60%] relative'>
                        <Image src={teamImage} alt='Our Team' className='mx-auto rounded-md aspect-[] object-cover' />
                    </div>
                    <div className='pt-10 w-[40%]'>
                        <div className='max-w-[520px]'>
                            <h2 className='text-[36px] font-bold leading-[110%] tracking-[-0.01em]'>Des collaborateurs animés par une même passion</h2>
                            <p className='text-lg font-semibold mt-6'>Chez Foil And Co., notre équipe partage une passion commune pour l’innovation et l’excellence. Chaque membre contribue à faire avancer notre mission avec engagement, créativité et expertise, afin de vous offrir des produits et services de qualité. Découvrez les visages de ceux qui oeuvrent à la production de vos équipements favoris.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Team Content */}
            <Team />
        </div>
    );
};

export default page;