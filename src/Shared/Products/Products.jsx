"use client"
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useTransition, useEffect, useRef } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import ProjectCard from '../../components/ProjectCard';
import { getProductsByCategoryId } from '../../funtions/getWooCommerce';
import SkeletonProjectCard from "../../Shared/Products/ProductLoader"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);



const Products = ({ minPrice, maxPrice, childCategories, min = null, max = null, id }) => {


    const filterRef = useRef(null);


    useGSAP(() => {
        if (!filterRef.current) return;
        gsap.to(filterRef.current, {
            scrollTrigger: {
                trigger: filterRef.current,
                endTrigger:".products",
                start: "top 170px",
                end: "bottom bottom",
                markers: true,
                pin: true,
            }
        })
    })


    const [value, setValue] = useState([minPrice, maxPrice]);
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const [ids, setIds] = useState([id]);

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
            const selectedIds = Array.from(checkedBoxes).map(cb => cb.value)?.length > 0 ? Array.from(checkedBoxes).map(cb => cb.value) : id;
            setIds(selectedIds);
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


    const [productData, setProductData] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setLoader(true)
        const load = async () => {
            const data = await getProductsByCategoryId(ids, max, min);
            setProductData(data);
            setLoader(false)
        }
        load();
    }, [ids, min, max])






    return (
        <div className='flex items-start justify-center gap-10 lg:flex-row flex-col-reverse global-padding max-w-[1920px] mx-auto'>
            <div ref={filterRef} className='lg:w-[20%] w-full'>
                <div className='h-[calc(90vh-140px)] overflow-y-scroll popup-scroll-bar-1'>
                    <div className='mb-6'>
                        <p className='font-semibold text-base leading-[100%] text-black mb-4'>CATÉGORIES</p>
                        {childCategories && childCategories.length > 0
                            ? renderCategories(childCategories)
                            : <p className="text-sm text-gray-500">No categories</p>}
                    </div>
                    <div>
                        <label className='uppercase text-base font-medium mb-4 block' for="vol">PRIX</label>
                        <RangeSlider min={minPrice} max={maxPrice} defaultValue={[min || minPrice, max || maxPrice]} onInput={(val) => handleChange(val)} className='my-dashed-slider -ml-2' />
                        <div className='text-[14px] leading-[15px] font-semibold mt-4'>
                            €{min || value[0].toFixed(2)} — €{max || value[1].toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
            {
                loader ?
                    <div className='grid xl:grid-cols-3 3xl:grid-cols-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 lg:gap-6 gap-4 lg:w-[80%] w-full grid-cols-2 max-w-[1920px] mx-auto global-margin'>
                        {
                            [...Array(6)].map((_, i) => {
                                return (
                                    <SkeletonProjectCard key={i} />
                                )
                            })
                        }
                    </div>
                    : <div className='grid xl:grid-cols-3 3xl:grid-cols-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 lg:gap-6 gap-4 lg:w-[80%] w-full grid-cols-2 max-w-[1920px] mx-auto global-margin products'>
                        {
                            productData?.map((product) => {
                                const { images } = product;
                                const bestseller = product?.acf?.bestseller;
                                return (
                                    <ProjectCard price={product?.price} type={product?.type} name={product?.name} bestseller={bestseller} hoverImage={images[1]?.src} image={images[0]?.src} key={product?.id} slug={product?.slug} />
                                )
                            })
                        }
                    </div>
            }
        </div>
    );
};

export default Products;