import React from 'react';

const FormButton = ({ label, type = "button" }) => {
    return (
        <button type={type} className='bg-black hover:bg-white hover:text-black transition-colors duration-200 ease-linear text-white font-semibold text-base leading-[100%] py-[10px] cursor-pointer px-4 rounded-[4px] uppercase'>
            {label}
        </button>
    );
};

export default FormButton;