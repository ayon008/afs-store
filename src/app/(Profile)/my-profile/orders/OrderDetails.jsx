"use client"
import { countriesList } from '../../../../Shared/Input/countries';
import { formatDate } from '../../../../funtions/formatDate';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const OrderDetails = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    const orderRef = useRef(null);
    const contentRef = useRef(null);
    const iconRef = useRef(null);

    useGSAP(() => {
        if (!orderRef.current) return;

        const fullHeight = contentRef.current.scrollHeight;

        gsap.to(iconRef.current, {
            rotate: isOpen ? 180 : 0,
            duration: 0.4,
            ease: "power1.inOut"
        });

        gsap.to(contentRef.current, {
            height: isOpen ? fullHeight : 0,
            duration: 0.4,
            ease: "power2.out"
        });
    }, [isOpen]);


    // console.log(order, 'order');
    const line_items = order?.line_items || [];


    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 767) {
                setVisibleCount(1);
            } else if (window.innerWidth < 1280) {
                setVisibleCount(2);
            } else {
                setVisibleCount(4);
            }
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);

        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const remaining = Math.max(line_items.length - visibleCount, 0);

    const shippingMethod = order?.shipping_lines?.[0]?.method_title || "";

    const country = countriesList.find((country) => country.code === order?.shipping?.country);

    console.log('order', order);


    function getPaymentStatusLabel(paymentStatus) {
        switch (paymentStatus) {
            case "processing":
            case "completed":
                return "Paid";

            case "on-hold":
                return "Awaiting Payment";

            case "pending":
                return "Pending Payment";

            case "refunded":
                return "Refunded";

            case "failed":
            case "cancelled":
                return "Payment Failed";

            default:
                return "Unknown";
        }
    }
    const paymentStatusLabel = getPaymentStatusLabel(order?.status);
    const total = order?.shipping_lines?.reduce((sum, line) => sum + parseFloat(line.total || 0), 0) || 0;



    return (
        <div ref={orderRef} className='bg-white p-5'>
            <div className='grid grid-cols-5 gap-2 items-center cursor-pointer h-[60px]' onClick={() => setIsOpen(!isOpen)}>
                <div className='col-span-2'>
                    <div className={`flex items-center flex-wrap ${isOpen ? "hidden" : "block"}`}>
                        {line_items.slice(0, visibleCount).map((item, i) => {
                            const src = item.image?.src || "";
                            return (
                                src && (
                                    <Image
                                        key={i}
                                        src={src}
                                        width={60}
                                        height={60}
                                        alt=""
                                        className="w-[60px] h-[60px] aspect-[1]"
                                    />
                                )
                            );
                        })}

                        {remaining > 0 && (
                            <span className="block ml-2 text-[clamp(.875rem,-.625rem+1.875vw,1.25rem)] leading-[100%] font-semibold">
                                + {remaining}
                            </span>
                        )}
                    </div>

                    <div className='space-y-2'>
                        {
                            isOpen && <>
                                <p className='text-base leading-[100%] font-semibold'>№{order?.id}</p>
                                <p className='text-sm text-[#111111bf] leading-[100%] font-medium'>
                                    {
                                        formatDate(order.date_created)
                                    }
                                </p>
                            </>
                        }
                    </div>
                </div>
                <div className='space-y-2'>
                    {
                        !isOpen && <>
                            <p className='text-base leading-[100%] font-semibold'>№{order?.id}</p>
                            <p className='text-sm text-[#111111bf] leading-[100%] font-medium'>
                                {
                                    formatDate(order.date_created)
                                }
                            </p>
                        </>
                    }
                </div>
                <div className='space-y-2'>
                    <p className={`text-base leading-[100%] font-semibold ${order?.status?.toLowerCase() === "cancelled" ? "text-[#8B0000]" : order?.status?.toLowerCase() === "processing" ? "text-[#D9C10F]" : order?.status?.toLowerCase() === "completed" ? "text-[#2A7029]" : "text-[#111]"} uppercase`}>{order?.status}</p>
                    <p className='text-sm text-[#111111bf] leading-[100%] font-medium'>{
                        formatDate(order.date_modified)
                    }</p>
                </div>
                <div>
                    <div className='w-fit ml-auto flex items-center gap-2'>
                        <p className={`${isOpen ? "hidden" : "block"} text-base leading-[100%] font-semibold`}>{order?.total}{order?.currency_symbol}</p>
                        <ChevronDown ref={iconRef} className='transition-transform duration-100 ease-in-out' />
                    </div>
                </div>
            </div>
            <div className='overflow-hidden' ref={contentRef}>
                <div className='py-[26px] flex max-[1380px]:flex-col flex-row gap-10'>
                    {/* Details */}
                    <div className='max-w-[290px] max-[1380px]:max-w-full'>
                        <div className='flex flex-col gap-[30px]'>
                            <div className='flex flex-col gap-3'>
                                <span className='text-lg uppercase text-[#111] font-semibold leading-[100%]'>Details</span>
                                <div className='flex flex-col gap-[10px]'>
                                    <div className='flex flex-col gap-[2px]'>
                                        <span className='text-sm text-[#111]/75 uppercase leading-[100%]'>Recipt</span>
                                        <span className='text-lg leading-[130%] capitalize'>{`${order?.billing.first_name} ${order?.billing.last_name}`}</span>
                                    </div>
                                    <div className='flex flex-col gap-[2px]'>
                                        <span className='text-sm text-[#111]/75 uppercase leading-[100%]'>Phone Number</span>
                                        <span className='text-lg leading-[130%]'>{`${order?.billing.phone}`}</span>
                                    </div>
                                    <div className='flex flex-col gap-[2px]'>
                                        <span className='text-sm text-[#111]/75 uppercase leading-[100%]'>Email</span>
                                        <span className='text-lg leading-[130%]'>{`${order?.billing.email}`}</span>
                                    </div>
                                    <div className='flex flex-col gap-[2px]'>
                                        <span className='text-sm text-[#111]/75 uppercase leading-[100%]'>Shipping</span>
                                        <span className='text-lg leading-[130%]'>{`${shippingMethod}`}</span>
                                    </div>
                                    <div className='flex flex-col gap-[2px]'>
                                        <span className='text-sm text-[#111]/75 uppercase leading-[100%]'>Address</span>
                                        <span className='text-lg leading-[130%]'>{`${order?.shipping?.address_1},${order?.shipping?.address_2},${order?.shipping?.city},${order?.shipping?.state},${order?.shipping?.postcode},${country.name}`}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex flex-col gap-3'>
                                    <span className='text-lg uppercase text-[#111] font-semibold leading-[100%]'>Paiement</span>
                                    <div className='flex flex-col gap-[2px]'>
                                        <span className='text-sm text-[#111]/75 uppercase leading-[100%]'>Paiement</span>
                                        <span className='text-lg leading-[130%] capitalize'>{`${order?.payment_method}`}</span>
                                    </div>
                                    <div className='flex flex-col gap-[2px]'>
                                        <span className='text-sm text-[#111]/75 uppercase leading-[100%]'>Paiement Status</span>
                                        <span className='text-lg leading-[130%]'>{getPaymentStatusLabel(order.status)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <div>
                            <span className='text-lg uppercase text-[#111] font-semibold leading-[100%]'>Details</span>
                            <ul className='space-y-1'>
                                {
                                    line_items.map((item, i) => {
                                        const src = item.image?.src || "";
                                        return (
                                            <li key={i} className='bg-[#F7F7F7] flex p-[10px] gap-[10px] items-center justify-between'>
                                                <div>
                                                    <Image
                                                        key={i}
                                                        src={src}
                                                        width={60}
                                                        height={60}
                                                        alt=""
                                                        className="w-[60px] h-[60px] aspect-[1]"
                                                    />
                                                </div>
                                                <div className='text-sm leading-[100%] text-[#111]'>
                                                    {item.name}
                                                </div>
                                                <div className='flex flex-col text-right gap-[10px]'>
                                                    <p className='text-sm font-semibold leading-[100%] uppercase text-[#111]/40'>Prix</p>
                                                    <span className='block text-lg leading-[130%] text-[#111] font-medium'>
                                                        {parseFloat(item.price).toFixed(2)}{order?.currency_symbol}
                                                    </span>
                                                </div>
                                                <div className='flex flex-col text-right gap-[10px]'>
                                                    <p className='text-sm font-semibold leading-[100%] uppercase text-[#111]/40'>Qté</p>
                                                    <span className='block text-lg leading-[130%] text-[#111] font-medium'>
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                                <div className='flex flex-col text-right gap-[10px]'>
                                                    <p className='text-sm font-semibold leading-[100%] uppercase text-[#111]/40'>Sous-total</p>
                                                    <span className='block text-lg leading-[130%] text-[#111] font-medium'>
                                                        {item?.subtotal}{order?.currency_symbol}
                                                    </span>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                <li className='p-[10px] flex justify-between gap-[10px] bg-[#F7F7F7]'>
                                    <p className='uppercase text-[#111] text-sm font-semibold leading-[100%]'>
                                        Shipping(Flat Rate)
                                    </p>
                                    <div className='flex flex-col text-right gap-[10px]'>
                                        <p className='text-sm font-semibold leading-[100%] uppercase text-[#111]/40'>Price</p>
                                        <span className='block text-lg leading-[130%] text-[#111] font-medium'>
                                            {total.toFixed(2)}{order?.currency_symbol}
                                        </span>
                                    </div>
                                </li>
                                <li className='p-[10px] flex justify-between gap-[10px] text-lg font-bold uppercase text-white bg-[#1F1F1F]'>
                                    <p >
                                        Price
                                    </p>
                                    <p>{order?.total}{order?.currency_symbol}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;