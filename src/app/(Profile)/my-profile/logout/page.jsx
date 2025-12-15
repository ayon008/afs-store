"use client"
import { ArrowUpRight } from 'lucide-react';
import FormButton from '../../../../Shared/Button/FormButton';
import React from 'react';
import Link from 'next/link';
import { logout } from '../../../../funtions/auth';
import { useRouter } from 'next/navigation';



const Page = () => {
    const router = useRouter();
    const handleLogOut = async () => {
        const response = await logout();
        router.push('/');
    }
    return (
        <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)]'>
            <div className='space-y-[clamp(0.875rem,0.5297rem+0.7203vw,1.25rem)]'>
                <h2 className='global-h2'>Déconnecter</h2>
                <p className='md:text-lg text-base leading-[130%] font-medium'>We look forward to your return whenever you're ready to log in again. Your account is always here with you, and you can come back to it whenever you need.</p>
                <div className='flex items-center gap-10 flex-wrap'>
                    <div onClick={() => handleLogOut()}>
                        <FormButton type='button' label={'Log Out of Your Account'} />
                    </div>
                    <Link href={'/category-product/foiling'}>
                        <p className='text-base uppercase font-semibold text-[#111]/75 leading-[100%]'>Go To Store
                            <ArrowUpRight className='inline w-5 h-5' />
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;