"use client"
import React from 'react';

const PopUp = ({ isOpen }) => {
    return (
        <>
            {
                isOpen && <div className='fixed z-[1500] left-0 right-0 top-0 bottom-0 backdrop-blur-[100px]'>

                </div>
            }
        </>
    );
};

export default PopUp;