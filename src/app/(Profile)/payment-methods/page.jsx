import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)]'>
            <div className='space-y-[clamp(0.875rem,0.5297rem+0.7203vw,1.25rem)]'>
                <h2 className='global-h2'>Modes de paiement</h2>
                <p className='profile-p'>Vous pouvez utiliser des cartes de crédit et de débit, des portefeuilles électroniques, le paiement à la livraison, les virements bancaires et d'autres modes de paiement alternatifs. Notre objectif est de vous offrir un maximum de commodité et de sécurité lors de vos achats, en vous proposant différentes options de paiement en fonction de vos choix et de vos besoins.</p>

            </div>
            <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)]'>
                <div className='space-y-[clamp(0.875rem,0.5297rem+0.7203vw,1.25rem)]'>
                    <div className='flex items-center justify-between pb-1 global-b-bottom'>
                        <h3 className='text-[28px] leading-[100%] font-semibold text-[#111]'>Vos moyens de paiement</h3>
                    </div>
                    <p className=''>Les nouveaux moyens de paiement ne peuvent être ajoutés que lors du paiement. <Link href={'/sav'} className='inline text-[#1D98FF]'>Contactez-nous</Link> si vous avez besoin d'aide.</p>
                </div>
            </div>
        </div>
    );
};

export default page;