"use client"
import { Minus, Plus, Trash2Icon } from 'lucide-react';
import React, { useState } from 'react'
import Image from 'next/image'

const SideCartItems = ({ item, onUpdateQuantity, onRemove }) => {
    const image = item.images?.[0]?.src || item.image;
    const name = item.name || item.title;
    const price = item?.prices?.price || 0;
    const total = item?.totals?.line_subtotal || 0;
    const currency_symbol = item?.prices?.currency_symbol || '€';
    const total_Currency_Symbol = item?.totals?.currency_symbol || '€';
    const variations = item?.variation || [];
    const itemKey = item?.key;
    const slug = item?.permalink?.split('/product/')?.[1]?.replace(/\/$/, '') || '';

    const [quantity, setQuantity] = useState(parseInt(item.quantity));
    const [updating, setUpdating] = useState(false);

    const handleIncrement = async () => {
        if (updating) return;
        setUpdating(true);
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        await onUpdateQuantity(itemKey, newQuantity);
        setUpdating(false);
    };

    const handleDecrement = async () => {
        if (updating || quantity <= 1) return;
        setUpdating(true);
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        await onUpdateQuantity(itemKey, newQuantity);
        setUpdating(false);
    };

    const handleRemoveItem = async () => {
        if (updating) return;
        setUpdating(true);
        await onRemove(itemKey);
        setUpdating(false);
    };

    // Format price (WooCommerce returns price in cents)
    const formatPrice = (value) => {
        return (parseInt(value) / 100).toFixed(2);
    };



    return (
        <div className='flex items-center gap-8 bg-[#F7F7F7] p-[10px] rounded-sm'>
            <div>
                <Image src={image} width={100} height={100} alt='product image' className='aspect-[1] object-contain' />
            </div>
            <div className='flex flex-col gap-[10px] w-full'>
                <span className='flex items-center justify-between'>
                    <span className='text-sm leading-[130%] capitalize font-bold text-[#111]'>{name}</span>
                    <span>{`${formatPrice(price)} ${currency_symbol}`}</span>
                </span>
                <span className='text-[#959595] text-sm space-y-2'>
                    {
                        variations?.map((variation, i) => {
                            return (
                                <dl key={i} className="font-normal text-[12px] leading-[130%] text-[#111]">
                                    <span className='flex items-center gap-[2px]'>
                                        <dt>
                                            {variation?.attribute}:
                                        </dt>
                                        <dd>
                                            <p>{variation?.value}</p>
                                        </dd>
                                    </span>
                                </dl>
                            )
                        })
                    }
                </span>
                <span className='text-base leading-[130%] capitalize font-bold text-[#111]'>{`${formatPrice(total)} ${total_Currency_Symbol}`}</span>
                <div className='flex items-center justify-between gap-4'>
                    <span className='flex-[1_0_0] flex items-center gap-2'>
                        <button
                            onClick={handleDecrement}
                            disabled={quantity <= 1 || updating}
                            className='cursor-pointer hover:bg-gray-100 rounded p-1 disabled:opacity-30 disabled:cursor-not-allowed'
                        >
                            <Minus className='w-4 h-4' />
                        </button>
                        <span className='min-w-[20px] text-center'>{quantity}</span>
                        <button
                            onClick={handleIncrement}
                            disabled={updating}
                            className='cursor-pointer hover:bg-gray-100 rounded p-1 disabled:opacity-30'
                        >
                            <Plus className='w-4 h-4' />
                        </button>
                    </span>
                    <button
                        onClick={handleRemoveItem}
                        disabled={updating}
                        className='cursor-pointer hover:bg-red-100 rounded p-1 disabled:opacity-30 disabled:cursor-not-allowed'
                    >
                        <Trash2Icon className='w-5 h-5' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideCartItems