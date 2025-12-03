import React from 'react';

const Input = ({ label, type, id, placeholder, register, error }) => {
    return (
        <div>
            <div className='relative'>
                <label
                    htmlFor={id}
                    className='uppercase bg-[#F0F0F0] absolute left-3 font-semibold -top-[14px] text-[#666] text-sm leading-[28px]'
                >
                    {label}
                </label>

                <input
                    {...register}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className={`border border-[#BFBFBF] rounded-[4px] w-full py-3 px-3 focus:outline-none text-lg leading-[23px] text-black font-semibold
                    ${error ? "border-red-500" : ""}`}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

    );
};

export default Input;
