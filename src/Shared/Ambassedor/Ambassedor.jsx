"use client"
import React, { useEffect, useState } from 'react';
import Map from "../SingleProduct/SVG/Map"
import Sec1 from '../../app/ambassadeur-afs/sec1';
import AmbassadorsCard from '../Card/AmbassadorsCard';
import { allAmbassadors } from "../../funtions/getAllAmbessador"

const Ambassedor = ({ categories, countries }) => {
    const [country, setCountry] = useState(null);
    const [data, setData] = useState([]);
    const [countryName, setCountryName] = useState("COUNTRY");
    // Discipline
    const [activeTab, setActiveTab] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const allData = await allAmbassadors(activeTab, country);
            setData(allData);
            setLoading(false);
        };
        load();
    }, [activeTab, country]);

    if (loading) {
        return <div className='h-[400px] w-full flex items-center justify-center'>
            <p className='text-3xl text-center'>Loading....</p>
        </div>
    }

    return (
        <div>
            <Map setCountry={setCountry} setCountryName={setCountryName} country={country} />
            <div className='lg:mt-[80px] mt-[40px] global-margin'>
                <Sec1 activeTab={activeTab} setCountry={setCountry} countryName={countryName} setCountryName={setCountryName} country={country} setActiveTab={setActiveTab} categories={categories} countries={countries} />
            </div>
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 gap-6 global-margin'>
                {
                    data?.map((data, i) => {
                        return (
                            <div key={i}>
                                <AmbassadorsCard data={data} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Ambassedor;