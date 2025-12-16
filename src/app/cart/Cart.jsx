"use client"
import React, { useEffect, useState } from 'react'
import CartList from './CartList'
import FormButton from '../../Shared/Button/FormButton';
import { getShippingMethods, selectShippingRate } from '../../funtions/StoreApi/cart';

const Cart = ({ cartItems }) => {
    const [shippingData, setShippingData] = useState(null);
    const [loading, setLoading] = useState(true);


    console.log(shippingData, 'shippingData');



    useEffect(() => {
        const fetchShippingMethods = async () => {
            setLoading(true);
            const result = await getShippingMethods();
            console.log('Shipping Methods Result:', result);
            if (result.success) {
                setShippingData(result.data);
                console.log('Location:', result.data.location);
                console.log('Shipping Rates:', result.data.shipping_rates);
                console.log('Selected Rate:', result.data.selected_rate);
            }
            setLoading(false);
        };

        fetchShippingMethods();
    }, []);

    const handleSelectRate = async (rateId) => {
        const result = await selectShippingRate(rateId);
        console.log('Select Rate Result:', result);
    };

    return (
        <div className='flex items-start gap-5 justify-between'>
            {/* left Side */}
            <div className='flex-[60%_0_0]'>
                <div className='border border-[#111]'>
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
                                return <CartList key={i} item={item} />
                            })
                        }
                    </div>
                </div>
                <div className='lg:mt-10 mt-5 p-5 border rounded-sm'>
                    <form className='flex items-center gap-5 flex-wrap'>
                        <input type="text" name='coupon-code' placeholder='Enter coupon code' className='px-[15px] py-3 border border-[#ccc] text-sm flex-[2_0_0]' />
                        <FormButton label={'Appliquer le code promo'} type='submit' />
                    </form>
                </div>
            </div>
            {/* Right Side */}
            <div className='flex-1 border border-[#111] py-10 px-5'>
                <h2 className='global-h2 text-[28px]! pb-5 global-b-bottom uppercase mb-5'>Totaux du panier</h2>
                <table className='w-full'>
                    <tbody className='flex flex-col gap-[10px] w-full'>
                        <tr className='flex w-full gap-5 items-center justify-between flex-wrap'>
                            <th className='text-base text-[#111] font-semibold leading-[100%]'>Sous-total</th>
                            <td className='text-base text-[#111] font-semibold leading-[100%]'>43643$</td>
                        </tr>
                        <tr className='flex flex-col gap-[10px] flex-wrap'>
                            <th className='text-base text-[#111] font-semibold leading-[100%] text-left'>EXPÉDITION</th>
                            <td className='flex flex-col gap-[10px]'>
                                <ul className='flex flex-col gap-[10px]'>
                                    <li className='border border-[#ccc] rounded-sm p-[15px] flex items-center gap-3'>
                                        <input type="radio" />
                                        <label htmlFor="">COD</label>
                                    </li>
                                </ul>
                                <p className='mt-[15px] p-4 border-l-2 border-[#1D98FF] text-sm leading-[130%] bg-[#F9F9F9]'>
                                    Liberation A <strong>Shipping Address</strong>
                                </p>
                            </td>
                        </tr>
                        <tr className='flex w-full gap-5 items-center justify-between flex-wrap bg-[#F9F9F9] p-4'>
                            <th className=''>
                                Total
                            </th>
                            <td className='flex flex-col gap-[10px] text-right'>
                                <strong className='text-right text-3xl text-[#111] font-bold'>53535$</strong>
                                <small>(dont <strong>2232,66€</strong> TVA)</small>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className='p-[15px] bg-[#1D98FF] text-white text-base font-semibold uppercase w-full rounded-sm mt-5'>
                    Continuer vers le paiement
                </button>
            </div>
        </div>
    )
}

export default Cart