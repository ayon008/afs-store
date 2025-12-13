"use client";
import React from 'react';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import ThirdForm from './ThirdForm';
import ForthForm from './ForthForm';
import useAuth from '../../../hooks/use-auth';

const Page = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return (
        <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)]'>
            <div className='space-y-[clamp(0.875rem,0.5297rem+0.7203vw,1.25rem)]'>
                <h2 className='global-h2'>User information</h2>
                <p className='profile-p'>Here you can enter or edit public information about yourself. The data will be used in the future for ordering. The changes you make will be displayed immediately after saving.</p>

            </div>
            <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)]'>
                {/* 1st form */}
                <FirstForm />
                {/* 2nd form */}
                <SecondForm />
                {/* 3rd form */}
                <ThirdForm />
                {/* 4th Form */}
                <ForthForm />
            </div>
        </div>
    );
};

export default Page;