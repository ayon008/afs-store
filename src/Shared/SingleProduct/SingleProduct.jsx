"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { getProductBySlug } from '../../funtions/getWooCommerce';
import Link from 'next/link';
import Image from 'next/image';
import PopUp from '../../Shared/Team/PopUp';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
// Import required Swiper modules
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Reviews from '../Reviews/Reviews';


function extractYouTubeID(url) {
    const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
}


const SingleProduct = () => {

    const swiperRef = useRef(null); // Swiper instance
    const [activeIndex, setActiveIndex] = useState(0); // track active slide

    const [default_slide, setSlide] = useState(1);

    const params = useParams();
    const { slug } = params;

    const [loader, setLoader] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoader(true);
        const load = async () => {
            const data = await getProductBySlug(slug);
            setData(data);
            setLoader(false);
        }
        load();
    }, [slug])
    const categories = data?.categories;

    const [images, setImages] = useState([]);
    const [sliceLength, setLength] = useState(0);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        if (!data) return; // wait for data to load

        const gallery_video_url_1 = data?.acf?.gallery_video_url_1;
        const gallery_thumbnail_1 = data?.acf?.gallery_thumbnail_1;
        const gallery_video_url_2 = data?.acf?.gallery_video_url_2;
        const gallery_thumbnail_2 = data?.acf?.gallery_thumbnail_2;

        // clone array (very important!)
        let newImages = [...(data?.images || [])];

        if (gallery_video_url_1) {
            newImages.splice(1, 0, { id: 208234, src: gallery_thumbnail_1?.url, video: true, alt: "", link: gallery_video_url_1 });
        }

        if (gallery_thumbnail_2) {
            newImages.splice(2, 0, { id: 208235, src: gallery_thumbnail_2?.url, video: true, alt: "", link: gallery_video_url_2 });
        }

        if (newImages?.length > 4) {
            setLength(4);
        }

        setImages(newImages);

    }, [data]); // re-run whenever data loads


    const acf = data?.acf;


    return (
        <div className='global-padding pt-4'>
            {/* <BreadCums /> */}
            <div className='flex items-start justify-between gap-10 global-margin'>
                <div className='w-[60%]'>
                    <div className='grid grid-cols-2 gap-[10px] relative'>
                        {
                            images?.slice(0, sliceLength)?.map((singleImage, i) => {
                                return (
                                    <div className='rounded-[4px] overflow-hidden bg-black relative' key={i}>
                                        <Image src={singleImage?.src} width={649} height={649} className='w-full h-full object-cover aspect-[1]' alt={singleImage?.alt} />
                                        {
                                            singleImage?.video &&
                                            <span onClick={() => {
                                                setOpen(true)
                                                setSlide(i)
                                            }} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
                                                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="1.5" y="1.5" width="53" height="53" rx="26.5" stroke="white" stroke-width="3" stroke-dasharray="10 10"></rect>
                                                    <path d="M37 26.2679C38.3333 27.0377 38.3333 28.9623 37 29.7321L25 36.6603C23.6667 37.4301 22 36.4678 22 34.9282L22 21.0718C22 19.5322 23.6667 18.5699 25 19.3397L37 26.2679Z" fill="white"></path>
                                                </svg>
                                            </span>
                                        }
                                    </div>
                                )
                            })
                        }
                        {
                            sliceLength === 4 && <button className='px-4 py-2 rounded-[20px] bg-white border-[#ccc] border w-fit text-base leading-[1.5rem] font-semibold absolute left-1/2 -translate-x-1/2 -bottom-5 cursor-pointer' onClick={() => setLength(images?.length)}>View all</button>
                        }
                    </div>
                </div>
                <div className='w-[40%]'>
                    <h2 className="lg:text-[38px] font-bold leading-[100%]">{data?.name}</h2>
                    {/* <div
            dangerouslySetInnerHTML={{ __html: data?.description }}
          /> */}
                </div>
            </div>


            {/* Review */}
            <Reviews acf={acf} />



            {/* Pop Up */}
            <PopUp isOpen={isOpen}>
                <div className='w-full h-full bg-white relative flex items-center justify-center'>
                    <div className='absolute top-2 right-2 z-10 rounded-full border border-black text-black p-1 cursor-pointer'>
                        <X className='w-5 h-5' onClick={() => setOpen(!isOpen)} />
                    </div>
                    <div className='w-full h-full'>
                        <div className='w-full h-full mx-auto flex flex-col items-center justify-center'>
                            <Swiper
                                modules={[Navigation, Pagination]}
                                navigation={{
                                    nextEl: "#customNext",
                                    prevEl: "#customPrev",
                                }}
                                spaceBetween={10}
                                slidesPerView={1}
                                initialSlide={default_slide}
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                className="mySwiper z-20 w-[80%] h-[80%] relative"
                            >
                                {
                                    images?.map((img, i) => {
                                        return (
                                            <SwiperSlide key={i} className='w-full h-full'>
                                                <div className='w-full h-full'>
                                                    {
                                                        img?.video ?
                                                            <>
                                                                <iframe
                                                                    width="78%"
                                                                    height="90%"
                                                                    src={activeIndex === i ? `https://www.youtube.com/embed/${extractYouTubeID(img.link)}?autoplay=1&mute=0` : ""}
                                                                    title="YouTube video"
                                                                    frameBorder="0"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                    className="rounded-[4px] mx-auto"
                                                                ></iframe>
                                                            </> :
                                                            <Image src={img?.src} className='w-full h-full rounded-[4px] object-contain aspect-[1]' width={649} height={649} alt={img?.alt} />
                                                    }
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }

                                {/* Pagination */}
                                <div className='absolute left-0 right-0 bottom-0 px-3 py-[10px] w-full z-50 backdrop-blur-[4px] border border-gray-200 rounded-[4px] flex items-center justify-center bg-white/20 gap-2'>
                                    {
                                        images?.map((singleImage, index) => {
                                            const isActive = activeIndex === index;
                                            return (
                                                <div
                                                    onClick={() => swiperRef.current?.slideTo(index)}
                                                    key={singleImage?.id}
                                                    className={`overflow-hidden rounded-[4px] relative cursor-pointer transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}
                                                >
                                                    <Image src={singleImage?.src} width={54} height={54} alt='' className='w-[54px] h-[54px] aspect-[1]' />
                                                    {
                                                        singleImage?.video &&
                                                        <span onClick={() => setOpen(true)} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
                                                            <svg width="20" height="20" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="1.5" y="1.5" width="53" height="53" rx="26.5" stroke="white" stroke-width="3" stroke-dasharray="10 10"></rect>
                                                                <path d="M37 26.2679C38.3333 27.0377 38.3333 28.9623 37 29.7321L25 36.6603C23.6667 37.4301 22 36.4678 22 34.9282L22 21.0718C22 19.5322 23.6667 18.5699 25 19.3397L37 26.2679Z" fill="white"></path>
                                                            </svg>
                                                        </span>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Swiper>
                            {/* Navigation Button */}
                            <button
                                id="customPrev"
                                className="absolute top-1/2 left-4 -translate-y-1/2 z-50 border border-black p-2 rounded-full shadow cursor-pointer"
                            >
                                <ArrowLeft className='w-4 h-4' />
                            </button>
                            <button
                                id="customNext"
                                className="absolute top-1/2 right-4 -translate-y-1/2 z-50 border border-black p-2 rounded-full shadow cursor-pointer"
                            >
                                <ArrowRight className='w-4 h-4' />
                            </button>
                            {/* */}
                        </div>
                    </div>
                </div>
            </PopUp>
        </div>
    );
};


export default SingleProduct;