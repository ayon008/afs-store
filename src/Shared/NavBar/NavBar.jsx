"use client"
import { Search, ShoppingCart, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SearchOverlay from "../../components/search";
import React, { useEffect, useState } from 'react';
import { useCart } from '../../components/cart-provider';
import "flag-icons/css/flag-icons.min.css";
import parse from "html-react-parser";


const Navbar = () => {
    // Search Open
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    // Shopping Cart
    const [isCartOpen, setIsCartOpen] = useState(false);
    // 
    const { totalQty } = useCart();
    // All THe Nav Data
    const [NAV_LINKS, setNAV_LINKS] = useState([]);
    // Hover Id [First Nav];
    const [hoverId, setHoverId] = useState(null);
    // Show Secondary white div and add Clicked Item Name [2nd Nav]
    const [detailsDiv, setDetailsDiv] = useState(null);

    // console.log(NAV_LINKS);


    useEffect(() => {
        const loadData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/menuItems`);
            const data = await response.json();
            let menuData = data.data;
            menuData = menuData.map((data) => {
                return {
                    name: data?.title,
                    href: data?.url,
                    sublinks: data?.children.map((singleData) => {
                        return {
                            name: singleData.title,
                            id: singleData.id,
                            products: singleData.menu_products
                        }
                    })
                }
            })
            setNAV_LINKS(menuData)
        };
        loadData()
    }, []);

    const subLinks = NAV_LINKS.find((Nav) => Nav?.name == hoverId);
    const productList = subLinks?.sublinks?.find((sub) => sub.name === detailsDiv)?.products;
    const [hoverImageLink, setHoverImageLink] = useState("");

    console.log(productList);


    // Show the white hover Items
    const handleShow = (name) => {
        setHoverId(name);
        setDetailsDiv(null);
    }

    return (
        <>
            <div className='fixed left-0 right-0 top-0 h-[157px] bg-black z-40'></div>
            <nav className='fixed left-0 right-0 top-0 z-50 bg-black text-white w-full'>
                {/* Logo and Search Part */}
                <div className='py-[16px] global-padding border-b border-gray-600 w-full flex items-center justify-between' onMouseEnter={() => handleShow(null)}>
                    {/* Logo */}
                    <Link href="/" className="hidden md:flex items-center">
                        <Image
                            src="/logo.svg"
                            alt="Alpago Properties Clone"
                            width={150}
                            height={45}
                            priority
                            className=""
                        />
                    </Link>
                    {/* 2nd Part */}
                    <div className='flex items-center gap-2'>
                        {/* Search Button */}
                        <div className='relative mr-4'>
                            <input
                                onClick={() => setIsSearchOpen(true)}
                                className="hidden md:flex items-center bg-[#3d3d3d] rounded-full h-9 w-64 px-3 placeholder:text-white placeholder:text-sm placeholder:pl-6 placeholder:font-semibold"
                                placeholder='Rechercher...'
                            />
                            <Search className="w-5 h-5 mr-2 text-white opacity-90 absolute -translate-y-1/2 left-3 top-1/2" />
                        </div>

                        {/* Profile */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 20.5714V17.1429C4 16.2335 4.42143 15.3615 5.17157 14.7185C5.92172 14.0755 6.93913 13.7143 8 13.7143H12H16C17.0609 13.7143 18.0783 14.0755 18.8284 14.7185C19.5786 15.3615 20 16.2335 20 17.1429V20.5714M16 6.85714C16.1205 9.14337 14.2894 11.1429 12 11.1429C9.7106 11.1429 7.87952 9.14337 8 6.85714C8.1142 4.6901 9.82995 3 12 3C14.17 3 15.8858 4.6901 16 6.85714Z" stroke="white" stroke-width="1.5" stroke-linecap="square" />
                        </svg>
                        {/* Cart */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="flex items-center justify-center relative p-1 md:p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                        >
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">

                                <path
                                    d="M2.88725 18.6807C1.76607 18.6807 0.857178 19.5836 0.857178 20.6975C0.857178 21.8113 1.76607 22.7143 2.88725 22.7143C4.00843 22.7143 4.91733 21.8113 4.91733 20.6975C4.91733 19.5836 4.00843 18.6807 2.88725 18.6807ZM2.88725 18.6807H14.0527M2.88725 18.6807V8.28571C2.88725 7.73343 2.43954 7.28571 1.88725 7.28571H0.857178M14.0527 18.6807C12.9315 18.6807 12.0226 19.5836 12.0226 20.6975C12.0226 21.8113 12.9315 22.7143 14.0527 22.7143C15.1738 22.7143 16.0827 21.8113 16.0827 20.6975C16.0827 19.5836 15.1738 18.6807 14.0527 18.6807ZM14.0527 18.6807H18"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="square"
                                />

                                <rect x="5.14282" y="0.857143" width="19.7143" height="15.4286" rx="2" fill="#1D98FF" />

                                {/* Dynamic number */}
                                <text
                                    x="15"
                                    y="10"
                                    fill="white"
                                    fontSize="10"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                >
                                    {totalQty || 0}
                                </text>
                            </svg>
                        </button>

                        {/* Language */}
                        <button className="hidden md:flex items-center justify-center text-sm font-extrabold p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                            <span className="fi fi-fr fis mr-2 scale-125"></span>
                            <span className="text-white text-[0.95rem] font-extrabold tracking-wide">
                                FR
                            </span>
                        </button>
                    </div>
                </div>
                {/* NAV LINKS */}
                <div className="hidden md:flex flex-col h-full relative">
                    <div className="flex justify-center items-center whitespace-nowrap px-4 h-full">
                        {NAV_LINKS.map((link, idx) => (
                            <div
                                key={idx}
                                className="relative group h-full"
                                onMouseEnter={() => handleShow(link.name)}
                            >
                                <Link
                                    href={link.href || ""}
                                    className="text-[16px] font-semibold tracking-wide flex items-center justify-center relative"
                                    style={{ padding: "28px 12px 28px" }}
                                >
                                    <span className="absolute top-0 bottom-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                                    <span className="relative z-10 text-white group-hover:text-black">
                                        {link.name}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Show the White Part of the  NavLink */}
                {
                    hoverId &&
                    <>
                        <div onMouseLeave={() => handleShow(null)} className='bg-white/95 text-black'>
                            <ul className='flex items-center justify-center'>
                                {subLinks?.sublinks?.map((children, i) => {
                                    return (
                                        <li
                                            onClick={() => setDetailsDiv(children.name)}
                                            className={`text-[16px] font-semibold tracking-wide cursor-pointer ${detailsDiv === children.name ? 'border-b border-b-black' : ''}`} style={{ padding: "24px 12px 24px" }}
                                            key={i}>
                                            {children.name}
                                        </li>
                                    )
                                })}
                            </ul>
                            {detailsDiv &&
                                <div className='bg-white/95 h-[calc(100vh-230px)] text-black/75 flex items-start justify-center overflow-y-auto gap-5'>
                                    <div className='space-y-5'>
                                        <div className='mt-[22px] space-y-1'>
                                            <h4 className='font-semibold text-base leading-[110%]'>{hoverId}</h4>
                                            <h3 className='font-semibold text-[28px] leading-[100%]'>{detailsDiv}</h3>
                                        </div>
                                        <div className='flex items-start justify-center pb-[22px]'>
                                            <div className="grid [grid-auto-flow:column] [grid-template-rows:repeat(4,1fr)] gap-y-5 [grid-auto-columns:1fr] flex-1 h-fit">
                                                {productList.map((product, i) => (
                                                    <div key={i} className='max-w-[270px]'>
                                                        <h5 onMouseEnter={() => setHoverImageLink(product.image)} className="text-lg leading-[130%] font-semibold cursor-pointer hover:text-[#1D98FF] hover:underline">
                                                            {product.name}
                                                        </h5>

                                                        <p className="font-semibold text-xs leading-[100%] price-wrapper mt-1">
                                                            {parse(product.price)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='max-w-[380px] mt-[22px] h-[300px]'>
                                        {
                                            hoverImageLink &&
                                            <img src={hoverImageLink} className='w-full h-full object-cover' alt='' />
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </>
                }

            </nav>
            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />

            {/* Add bg blur */}
            {
                hoverId &&
                <div className="absolute inset-0 z-30 backdrop-blur-sm" onMouseEnter={() => handleShow(null)}></div>
            }
        </>
    );
};

export default Navbar;