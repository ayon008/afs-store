"use client"
import React, { useState } from 'react';
import Map from "../../Shared/SVG/Map"
import Sec1 from '../../app/ambassadeur-afs/sec1';
const Ambassedor = ({ categories }) => {
    const [country, setCountry] = useState("");

    return (
        <div>
            <Map setCountry={setCountry} />
            <div className='lg:my-[80px] my-[40px]'>
                <Sec1 categories={categories} />
            </div>
        </div>
    );
};

export default Ambassedor;