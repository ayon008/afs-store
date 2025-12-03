import Register from '@/Shared/Form/Register';
import Link from 'next/link';
import React from 'react';
import FeatureBar from '../../constants/FeatureBar';


export const metadata = {
    title: "Créer un compte | AFS Store",
    description:
        "Créez votre compte AFS Store pour profiter d'une expérience personnalisée, suivre vos commandes et accéder à des fonctionnalités exclusives.",
    keywords: "inscription, créer un compte, register, nouveau compte, AFS Store",
    openGraph: {
        title: "Inscription | AFS Store",
        description:
            "Créez votre compte AFS Store pour profiter d'une expérience personnalisée, suivre vos commandes et accéder à des fonctionnalités exclusives.",
        type: "website",
    },
};


const BreadCums = () => {
    return (
        <div className='uppercase'>
            <div className='font-bold text-sm text-[#999999]'>
                <Link className='inline' href={'/'}>Accueil</Link> / <span className='text-black'>Mon compte</span>
            </div>
        </div>
    )
}


const page = () => {
    return (
        <div>
            <div className='pt-4 bg-white/95 min-h-screen global-padding'>
                <BreadCums />
                <div className='flex items-center justify-center lg:mt-[80px] mt-[40px] global-margin'>
                    <Register />
                </div>
            </div>
            <FeatureBar />
        </div>
    );
};

export default page;