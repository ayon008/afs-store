"use client"
import React, { useEffect, useState } from 'react'
import CartList from './CartList'
import FormButton from '../../Shared/Button/FormButton';
import { selectShippingRate } from '../../funtions/StoreApi/cart';
import useCart from '../../hooks/useCart';
import { CheckCircle, X } from 'lucide-react';

const Cart = () => {
    // const [shippingData, setShippingData] = useState([]);
    const [shippingLoading, setShippingLoading] = useState(false);
    const [selectedRateId, setSelectedRateId] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [couponLoading, setCouponLoading] = useState(false);
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');


    const {
        handleApplyCoupon,
        handleRemoveCoupon,
        getAppliedCoupons,
        getDiscountTotal,
        getCurrencySymbol,
        loadCart,
        cart
    } = useCart();

    const appliedCoupons = getAppliedCoupons();
    const discountTotal = getDiscountTotal();
    // const totalPrice = getTotalPrice();
    const currencySymbol = getCurrencySymbol();

    const allShippingRates = cart?.shipping_rates?.flatMap(pkg =>
        pkg.shipping_rates?.map(rate => ({
            ...rate,
            package_id: pkg.package_id
        })) || []
    ) || [];


    useEffect(() => {
        const selected = allShippingRates.find(rate => rate.selected);

        if (selected) {
            setSelectedRateId(selected.rate_id);
        } else {
            setSelectedRateId(null);
        }
    }, [allShippingRates]);


    const handleSelectRate = async (value) => {
        const [packageId, rateId] = value.split(':');
        if (rateId === selectedRateId) return;
        // console.log(packageId, rateId, 'package_id, rate_id');
        setShippingLoading(true);
        const result = await selectShippingRate(rateId, packageId);
        if (result.success) {
            setSelectedRateId(rateId);
            // Refresh cart to get updated totals
            await loadCart();
            setShippingLoading(false);
        }
    };


    const total = cart?.totals?.total_price / 100;


    const handleCouponSubmit = async (e) => {
        e.preventDefault();
        if (!couponCode.trim()) return;

        setCouponLoading(true);
        setCouponError('');
        setCouponSuccess('');

        const result = await handleApplyCoupon(couponCode);

        if (result.success) {
            setCouponSuccess('Code promo appliqué avec succès.');
            setCouponCode('');
        } else {
            setCouponError(result.error || 'Code promo invalide');
        }

        setCouponLoading(false);
    };

    const handleRemoveCouponClick = async (code) => {
        setCouponLoading(true);
        setCouponError('');
        setCouponSuccess(''); // Clear success message when removing coupon

        const result = await handleRemoveCoupon(code);

        if (!result.success) {
            setCouponError(result.error || 'Erreur lors de la suppression du coupon');
        }
        // No success message when removing - just clear the banner

        setCouponLoading(false);
    };

    // cartItems
    const cartItems = cart?.items || [];
    // const total = cart?.totals?.total_price / 100;
    const sub_total = cart?.totals?.total_items / 100 + cart?.totals?.total_items_tax / 100 || 0;
    const total_tax = cart?.totals?.total_tax / 100;





    return (
        <div>
            {
                couponSuccess && (
                    <div className='py-4 px-5 flex items-center gap-4 bg-[#2A7029]/30 border-2 my-8 border-[#2A7029] rounded-sm'>
                        <CheckCircle className='w-4 h-4 text-[#2A7029]' />
                        <span className='text-[#2A7029] text-lg leading-[100%] font-semibold'>Code promo appliqué avec succès.</span>
                    </div>
                )
            }
            <div className='flex items-start gap-5 justify-between global-margin'>
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
                                [...cartItems].reverse().map((item, i) => {
                                    return <CartList key={i} item={item} />
                                })
                            }
                        </div>
                    </div>
                    <div className='lg:mt-10 mt-5 p-5 border rounded-sm space-y-4'>
                        <form onSubmit={handleCouponSubmit} className='flex items-center gap-5 flex-wrap'>
                            <input
                                type="text"
                                name='coupon-code'
                                placeholder='Enter coupon code'
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className='px-[15px] py-3 border border-[#ccc] text-sm flex-[2_0_0]'
                                disabled={couponLoading}
                            />
                            <FormButton
                                label={couponLoading ? 'Chargement...' : 'Appliquer le code promo'}
                                type='submit'
                                disabled={couponLoading || !couponCode.trim()}
                            />
                        </form>

                        {couponError && (
                            <p className='text-red-500 text-sm'>{couponError}</p>
                        )}
                        {couponSuccess && (
                            <p className='text-green-500 text-sm'>{couponSuccess}</p>
                        )}

                        {appliedCoupons.length > 0 && (
                            <div className='flex flex-wrap gap-2'>
                                <span className='text-sm font-semibold'>Coupons appliqués :</span>
                                {appliedCoupons.map((coupon, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm'
                                    >
                                        <span>{coupon.code}</span>
                                        <span className='font-semibold'>
                                            (-{(coupon.totals?.total_discount / 100 || 0).toFixed(2)}€)
                                        </span>
                                        <button
                                            type='button'
                                            onClick={() => handleRemoveCouponClick(coupon.code)}
                                            disabled={couponLoading}
                                            className='hover:text-red-500 disabled:opacity-50'
                                        >
                                            <X className='w-4 h-4' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {/* Right Side */}
                <div className='flex-1 border border-[#111] py-10 px-5'>
                    <h2 className='global-h2 text-[28px]! pb-5 global-b-bottom uppercase mb-5'>Totaux du panier</h2>
                    <table className='w-full'>
                        <tbody className='flex flex-col gap-[10px] w-full'>
                            <tr className='flex w-full gap-5 items-center justify-between flex-wrap'>
                                <th className='text-base text-[#111] font-semibold leading-[100%]'>Sous-total</th>
                                <td className='text-base text-[#111] font-semibold leading-[100%]'>{sub_total}{currencySymbol}</td>
                            </tr>
                            {parseFloat(discountTotal) > 0 && (
                                <tr className='flex w-full gap-5 items-center justify-between flex-wrap'>
                                    <th className='text-base text-[#111] font-semibold leading-[100%]'>Réduction</th>
                                    <td className='text-base text-green-600 font-semibold leading-[100%]'>-{discountTotal}{currencySymbol}</td>
                                </tr>
                            )}

                            <tr className='flex flex-col gap-[10px] flex-wrap'>
                                <th className='text-base text-[#111] font-semibold leading-[100%] text-left'>EXPÉDITION</th>
                                <td className='flex flex-col gap-[10px]'>
                                    <form action="">
                                        <ul className={`flex flex-col gap-[10px] ${shippingLoading ? 'opacity-50' : 'opacity-100'}`}>
                                            {allShippingRates?.map((rate, i) => {
                                                return (
                                                    <li key={i} className='border border-[#ccc] rounded-sm p-[15px] flex items-center gap-3 flex-wrap justify-between'>
                                                        <div className='flex items-center gap-3'>
                                                            <input
                                                                checked={selectedRateId === rate.rate_id}
                                                                value={`${rate.package_id}:${rate.rate_id}`}
                                                                onChange={(e) => handleSelectRate(e.target.value)}
                                                                defaultChecked={selectedRateId === rate.rate_id}
                                                                type="radio"
                                                                name="shipping_method"
                                                            />
                                                            <label htmlFor="" className="break-normal max-w-full">{rate.name}</label>
                                                        </div>
                                                        <div className='text-base text-[#111] font-semibold leading-[100%]'>
                                                            {
                                                                (rate.price / 100 + rate.taxes / 100) === 0 ? <span className='text-green-600'>Gratuit</span> : `${(rate.price / 100 + rate.taxes / 100).toFixed(2)}${rate.currency_symbol}`
                                                            }
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </form>
                                    <p className='mt-[15px] p-4 border-l-2 border-[#1D98FF] text-sm leading-[130%] bg-[#F9F9F9]'>
                                        Liberation A <strong>Shipping Address</strong>
                                    </p>
                                </td>
                            </tr>
                            <tr className='flex w-full gap-5 items-center justify-between flex-wrap bg-[#F9F9F9] p-4'>
                                <th className='!bg-[#F9F9F9]'>
                                    Total
                                </th>
                                <td className='flex flex-col gap-[10px] text-right'>
                                    <strong className='text-right text-3xl text-[#111] font-bold'>{total}{currencySymbol}</strong>
                                    {parseFloat(total_tax) > 0 && (
                                        <small>(dont <strong>{total_tax}{currencySymbol}</strong> TVA)</small>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='p-[15px] cursor-pointer bg-[#1D98FF] text-white text-base font-semibold uppercase w-full rounded-sm mt-5'>
                        Continuer vers le paiement
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart