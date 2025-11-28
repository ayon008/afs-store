"use client"
import React, { useState } from 'react';
import Map from "../../Shared/SVG/Map"

const Ambassedor = () => {
    const [country, setCountry] = useState("");

    return (
        <div>
            <Map setCountry={setCountry} />
        </div>
    );
};

export default Ambassedor;