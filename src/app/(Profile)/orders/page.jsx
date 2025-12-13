import { ArrowUpRight, Pen } from 'lucide-react';
import FormButton from '../../../Shared/Button/FormButton';
import Input from '../../../Shared/Input/input';
import React from 'react';

const page = () => {
    return (
        <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)]'>
            <div className='space-y-[clamp(0.875rem,0.5297rem+0.7203vw,1.25rem)]'>
                <h2 className='global-h2'>Commandes</h2>
                <p className='profile-p'>Here, you can review all your previous orders, track the status of active orders, edit or cancel them as needed, and easily reorder past purchases without the need to add items to your cart again.</p>
            </div>
        </div>
    );
};

export default page;