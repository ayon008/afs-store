import Link from 'next/link';
import React from 'react';
import Ambassedor from "../../Shared/Ambassedor/Ambassedor"
import getAmbessedor from "../../funtions/getAmbessedor";
import Sec1 from '../../app/ambassadeur-afs/sec1';
import AmbassadorsCard from "../../Shared/Card/AmbassadorsCard"

const BreadCums = () => {
    return (
        <div className='uppercase'>
            <div className='font-bold text-sm text-[#999999]'>
                <Link className='inline' href={'/'}>Accueil</Link> / <span className='text-black'>Nos ambassadeurs
                </span>
            </div>
        </div>
    )
}


// All ambassadors
const allAmbassadors = async () => {
    try {
        const response = await fetch(`${process.env.WP_BASE_URL}/wp-json/wp/v2/ambassador?per_page=100&_embed`, {
            next: { revalidate: 3600 }
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}


const page = async () => {
    const categories = await getAmbessedor();
    const allData = await allAmbassadors();

    return (
        <div className='global-padding pt-4'>
            <div className=''>
                <BreadCums />
            </div>
            <div className='lg:my-[80px] my-[40px]'>
                <h1 className='global-h1 text-center'>AFS Ambassadors <span className='global-blue'>team</span></h1>
            </div>
            <Ambassedor />
            <div className='lg:mt-[80px] mt-[40px] global-margin'>
                <Sec1 categories={categories} />
            </div>
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 gap-6'>
                {
                    allData?.map((data, i) => {
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

export default page;