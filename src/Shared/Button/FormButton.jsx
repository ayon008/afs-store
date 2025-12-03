import React from 'react';

const FormButton = ({ label, type = "button" }) => {
    return (
        <button type={type} className='bg-black text-white font-semibold text-base leading-[100%] py-[10px] px-4 rounded-[4px] uppercase'>
            {label}
        </button>
    );
};

export default FormButton;