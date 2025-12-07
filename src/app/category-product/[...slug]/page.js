import React from 'react';
import default_image from "../../../assets/images/GWEN-WB-D-lite-1024x573.png.webp"
import ProjectCard from '../../../components/ProjectCard';
import { getParentCategory, getProductsByCategoryId } from "../../../funtions/getWooCommerce"
import Ranger from "../../../Shared/Ranger/Ranger"


import Link from 'next/link';

const page = async ({ params, searchParams }) => {
    // Catch All Route
    const { slug } = params;
    // Destructuring the params from slug
    const [parent, ...children] = slug;

    // Getting the Category details by the slug
    const category = await getParentCategory(slug[slug?.length - 1].toLowerCase());

    console.log(category);


    const image = category?.image?.src || default_image;
    let productData = await getProductsByCategoryId(category?.id);
    const maxPrice = Math.max(...productData.map(p => p?.price));
    const minPrice = Math.min(...productData.map(p => p?.price));

    const { min = null, max = null } = await searchParams;

    productData = await getProductsByCategoryId(category?.id, max, min);


    const BreadCums = () => {
        let path = "/category-product";

        return (
            <div className='uppercase'>
                <div className='font-bold text-sm text-white'>
                    <Link className='inline' href="/">Accueil</Link>

                    {slug?.map((singleSlug, i) => {
                        path = path + `/${singleSlug}`
                        return (
                            <Link
                                key={i}
                                href={path}
                                className="uppercase inline"
                            >
                                {" / "}{singleSlug.split("-").join(" ")}
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    };


    return (
        <div>
            <div className='lg:h-[620px] h-[485px] w-full relative global-margin bg-no-repeat bg-cover bg-center'
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className='global-padding pt-4 max-w-[1920px] mx-auto'>
                    <BreadCums />
                    <div>
                        <h1 className='global-h2 text-white absolute bottom-8'>
                            {category?.name}
                        </h1>
                    </div>
                </div>
            </div>
            <div className='flex items-start justify-center gap-10 lg:flex-row flex-col-reverse global-padding'>
                <div className='lg:w-[20%] w-full'>
                    <Ranger maxPrice={maxPrice} minPrice={minPrice} />
                </div>
                <div className='grid xl:grid-cols-3 3xl:grid-cols-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 lg:gap-6 gap-4 lg:w-[80%] w-full grid-cols-2 max-w-[1920px] mx-auto global-margin'>
                    {
                        productData?.map((product) => {
                            const { images } = product;
                            const bestseller = product?.acf?.bestseller;
                            return (
                                <ProjectCard price={product?.price} type={product?.type} name={product?.name} bestseller={bestseller} hoverImage={images[1]?.src} image={images[0]?.src} key={product?.id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default page;