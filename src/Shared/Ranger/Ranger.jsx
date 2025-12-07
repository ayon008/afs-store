"use client"
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const Ranger = ({ maxPrice, minPrice, childCategories }) => {
    const [value, setValue] = useState([minPrice, maxPrice]);
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleChange = (val) => {
        setValue(val);
        // Use current pathname instead of hardcoded slug so this works for any category
        const newUrl = `${pathname}?min=${val[0]}&max=${val[1]}`;

        // perform client navigation then refresh the server-rendered data
        startTransition(() => {
            router.replace(newUrl, { scroll: false });
            router.refresh();
        });
    }



    const renderCategories = (categories) => {
        const logSelectedCategoryIds = () => {
            const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
            const selectedIds = Array.from(checkedBoxes).map(cb => cb.value);
            console.log("Selected Category IDs:", selectedIds);
        };

        return (
            <ul className="space-y-3">
                {categories.map((cat) => (
                    <li key={cat.id} className="flex flex-col">

                        {/* Checkbox + Label */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="peer w-3 h-3 cursor-pointer accent-black"
                                value={cat.id}
                                onChange={logSelectedCategoryIds}
                            />
                            <span className="text-[#999] font-semibold text-[14px] leading-[16px] uppercase peer-checked:text-[#111111bf]">
                                {cat.name}
                            </span>
                        </label>

                        {/* Children */}
                        {Array.isArray(cat.children) && cat.children.length > 0 && (
                            <div className="ml-6 mt-3">
                                {renderCategories(cat.children)}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };



    return (
        <div>
            <div className='mb-6'>
                <p className='font-semibold text-base leading-[100%] text-black mb-4'>CATÉGORIES</p>
                {childCategories && childCategories.length > 0
                    ? renderCategories(childCategories)
                    : <p className="text-sm text-gray-500">No categories</p>}
            </div>
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

