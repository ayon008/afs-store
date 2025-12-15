import { Minus, Plus, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Cart = ({ cartItems }) => {
    return (
        <div className='flex items-center justify-between'>
            {/* left Side */}
            <div className='flex-[60%_0_0] border border-[#111]'>
                <div>
                    <div className='items-center justify-between gap-[10px] hidden md:flex px-6 py-3 global-b-bottom'>
                        <span className='flex-[1_0_0]'></span>
                        <span className='flex-2'>Product</span>
                        <span className='flex-[1_0_0]'>Price</span>
                        <span className='flex-[1_0_0]'>Quantity</span>
                        <span className='flex-[1_0_0]'>Sub total</span>
                    </div>
                    {
                        cartItems.map((item, i) => {
                            console.log(item);
                            const image = item.image || item.images[0].src;
                            const name = item.name || item.title;
                            const quantity = item.quantity;
                            const price = item?.prices?.price || 0;
                            const total = item?.totals?.line_subtotal || 0;
                            const currency_symbol = item?.prices?.currency_symbol || '€';
                            const total_Currency_Symbol = item?.totals?.currency_symbol || '€';
                            const variations = item?.variation || [];

                            console.log(variations, 'variations');
                            


                            return (
                                <div key={i} className='items-center justify-between gap-[10px] hidden md:flex px-6 py-3'>
                                    <span className='flex items-center gap-1 flex-[1_0_0]'>
                                        <Trash2Icon className='w-4 h-4' />
                                        <Image src={image} alt='cart' width={60} height={60} />
                                    </span>
                                    <span className='flex-2 text-[15px] font-bold leading-[100%] text-[#1D98FF] flex-col flex gap-[10px]'>
                                        <Link href={'/product/flyer-full-set/enduro-1300'}>{name}</Link>
                                        {
                                            variations?.map((variation, i) => {
                                                return (
                                                    <dl className="font-normal text-[14.4px] leading-[130%] text-[#111]">
                                                        <span className='flex items-center gap-1'>
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
                                    <span className='flex-[1_0_0] text-sm text-[#111] leading-[100%] font-medium'>{`${price} ${currency_symbol}`}
                                    </span>
                                    <span className='flex-[1_0_0] flex items-center gap-2'>
                                        <Minus className='w-4 h-4' />
                                        <span>{quantity}</span>
                                        <Plus className='w-4 h-4' />
                                    </span>
                                    <span className='flex-[1_0_0] text-sm text-[#111] leading-[100%] font-medium'>
                                        {`${total} ${total_Currency_Symbol}`}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* Right Side */}
            <div className='flex-1'>
                {/* A */}
            </div>
        </div>
    )
}

export default Cart