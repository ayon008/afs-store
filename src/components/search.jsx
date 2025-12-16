"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentProducts, searchProducts } from '../funtions/getWooCommerce';
import useGetData from '../funtions/ClientFetch/GetData';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useForm } from 'react-hook-form';

const SEARCH_HISTORY_KEY = 'search_history';
const MAX_HISTORY_ITEMS = 10;




const SearchOverlay = ({ isOpen, onClose }) => {

  // React Hook Form
  const { register, handleSubmit, watch, reset, setValue } = useForm();
  const searchValue = watch('search', '');


  const { isLoading, isError, error, data, refetch } = useGetData('recent-products', getRecentProducts);

  console.log(data, 'data');

  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {

    if (!searchValue || searchValue.length === 0) {
      setProducts(data?.products || []);
      return;
    }


    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchProducts(searchValue);
        const matched = results?.products?.filter((product) => product?.name?.toLowerCase().includes(searchValue?.toLowerCase()));
        setProducts(matched || results || []);
      } catch (err) {
        console.error('Search error:', err);
        setProducts([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue, data])


  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Search history state
  const [searchHistory, setSearchHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (stored) {
      setSearchHistory(JSON.parse(stored));
    }
  }, []);

  // Save to history when user submits
  const onSubmit = (data) => {
    const term = data.search?.trim();
    if (!term) return;

    const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, MAX_HISTORY_ITEMS);
    setSearchHistory(newHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));

    // TODO: handle search navigation
    reset();
  };

  // Remove single item from history
  const removeFromHistory = (term) => {
    const newHistory = searchHistory.filter(h => h !== term);
    setSearchHistory(newHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  // Clear all history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };



  const searchRef = useRef(null);
  useGSAP(() => {
    if (!searchRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(searchRef.current, {
        clipPath: isOpen
          ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.5,
        ease: "power2.inOut"
      })
    })
    return () => ctx.revert();
  }, { dependencies: [isOpen], revertOnUpdate: true })


  return (
    <div className={`fixed top-0 left-0 right-0 w-full h-full bg-black/50 backdrop-blur-md z-[998] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>

      <div className="bg-white p-6 space-y-6" ref={searchRef} style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}>
        <div className="flex items-center justify-between gap-[10px]">
          <button onClick={onClose} className="flex items-center gap-2 text-[#111] text-sm cursor-pointer">
            <X className="w-4 h-4" /> Close
          </button>
          <form className="flex-[1_0_0] w-full relative" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Search for..."
              className="px-4 py-2 flex-[1_0_0] w-full focus:outline-none border-b-2 border-b-[#1D98FF] pl-10"
              {...register('search')}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#111]" />
          </form>
        </div>
        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="flex flex-wrap items-center gap-4">
            <span>Latest searches :</span>
            {searchHistory.map((term, index) => (
              <div onClick={() => setValue('search', term)} key={index} className="flex items-center gap-1 justify-center cursor-pointer bg-[#f7F7F7] rounded-sm text-sm w-fit py-1 px-2">
                <span>{term}</span>
                <button type="button" onClick={() => removeFromHistory(term)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={clearHistory} className="text-[#1D98FF] font-semibold text-sm cursor-pointer">
              Delete all
            </button>
          </div>
        )}
        {/* Products */}
        <div className='space-y-4'>
          <h2 className="text-[#111] text-sm font-semibold">Recommended products</h2>

          <Swiper
            modules={[Navigation]}
            spaceBetween={"16px"}
            slidesPerView={"auto"}
            loop={false}
            navigation={true}
            grabCursor={true}
            className={`${isSearching ? 'opacity-70' : 'opacity-100'} search-swiper items-stretch!`}
          >
            {
              products?.map((product) => {
                const image = product?.images[0]?.src.large;
                const name = product?.name;
                const price = product?.prices?.price;
                const currency = product?.prices?.currency.currency_symbol;
                const slug = product?.slug;

                return (
                  <SwiperSlide key={product.id} className='h-auto! max-w-[240px] w-full'>
                    <Link onClick={onClose} className='h-full p-5 flex flex-col justify-between gap-6 bg-[#f7F7F7] rounded-sm' href={`/product/${slug}`}>
                      <div className='flex flex-col gap-[10px] text-center'>
                        <Image src={image} width={100} height={100} alt='' className='w-full h-full aspect-[1] object-contain' />
                        <font className='text-[#111] text-lg uppercase leading-[100%] font-bold'>{name}</font>
                      </div>
                      <font className='text-[#111] text-sm leading-[100%] text-center'>{price}{currency}</font>
                    </Link>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      </div>

    </div >
  )
}

export default SearchOverlay;