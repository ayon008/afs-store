"use client"
import React, { useEffect, useState } from 'react';
import Map from "../../Shared/SVG/Map"
import Sec1 from '../../app/ambassadeur-afs/sec1';
import AmbassadorsCard from '../Card/AmbassadorsCard';
import getAmbessedorByCat from "../../funtions/getAmbessedorByCat"

const Ambassedor = ({ allData, categories }) => {
    const [country, setCountry] = useState("");
    const [data, setData] = useState(allData);
    // Discipline
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        if (activeTab === 1) {
            setActiveTab(1);
            return
        }
        const data = async (activeTab) => {
            const allData = await getAmbessedorByCat(activeTab);
            setData(allData)
        };
        data(activeTab)
    }, [activeTab])

    console.log(activeTab);
    console.log(data?.length);



    return (
        <div>
            <Map setCountry={setCountry} />
            <div className='lg:mt-[80px] mt-[40px] global-margin'>
                <Sec1 activeTab={activeTab} setActiveTab={setActiveTab} categories={categories} />
            </div>
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 gap-6'>
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