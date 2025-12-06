"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const Ranger = ({ maxPrice, minPrice }) => {
    const [value, setValue] = useState([minPrice, maxPrice]);
    const router = useRouter();

    const handleChange = (val) => {
        setValue(val);
        router.replace(`/category-product/foiling?min=${val[0]}&max=${val[1]}`, { scroll: false })
    }

    return (
        <div>
            <div>
                <label className='uppercase text-base font-medium mb-4 block' for="vol">PRIX</label>
                <RangeSlider min={minPrice} max={maxPrice} defaultValue={[minPrice, maxPrice]} onInput={(val) => handleChange(val)} className='my-dashed-slider -ml-2' />
                <div className='text-[14px] leading-[15px] font-semibold mt-4'>
                    €{value[0].toFixed(2)} — €{value[1].toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default Ranger;

