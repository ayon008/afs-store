"use client"
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const DropDown = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const items = ["ALL", "Advance dealers", "Company", "Dealers", "Schools"];
    const [selected, setSelected] = useState("ALL");


    return (
        <div className="relative mt-2 lg:mt-0 w-[300px] rounded-[4px] cursor-pointer bg-white"> {/* fix width to match dropdown */}
            <button
                className={`
      w-full flex items-center justify-between gap-2
      p-[10px] font-bold text-[15px] leading-[20px] cursor-pointer transition-colors border bg-white border-gray-400 rounded-[4px]
    `}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {selected}
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                />
            </button>

            {isDropdownOpen && (
                <div className="absolute left-0 w-full shadow-lg z-40 rounded-[4px]">
                    {items.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setSelected(item)
                                setIsDropdownOpen(false)
                            }}
                            className={`w-full text-left p-[10px] font-bold text-[15px] leading-[20px] cursor-pointer transition-colors ${item === selected ? 'bg-black text-white' : "bg-white text-black"}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;