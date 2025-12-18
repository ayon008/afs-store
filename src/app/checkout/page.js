/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from 'react'
import Input from '../../Shared/Input/input';
import Select from '../../Shared/Input/Select';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import useCart from '../../hooks/useCart';
import { useEffect } from 'react';
import CountrySelect from '../../Shared/Input/DropDown';
import { countriesList } from '../../Shared/Input/countries';
import { getCountryDetails, getPaymentMethods } from '../../funtions/getWooCommerce';
import { selectShippingRate } from '../../funtions/StoreApi/cart';
import Image from 'next/image';


const Page = () => {

  const [shippingAddress, setShippingAddress] = useState(false);
  const handleShow = event => {
    setShippingAddress(event.target.checked);
  }

  // Cart
  const { cart, loadCart } = useCart();

  const cartBillingAddress = cart?.billing_address;
  const cartShippingAddress = cart?.shipping_address;

  console.log(cartShippingAddress, 'cartShippingAddress');


  const items = cart?.items;

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      billing_first_name: '',
      billing_last_name: '',
      billing_company: '',
      billing_country: '',
      billing_address_1: '',
      billing_city: '',
      billing_state: '',
      billing_postcode: '',
      billing_phone: '',
      billing_email: '',
      survey: '',
      shipping_first_name: '',
      shipping_last_name: '',
      shipping_company: '',
      shipping_country: '',
      shipping_address_1: '',
      shipping_city: '',
      shipping_state: '',
      shipping_postcode: '',
      order_comments: '',
      payment_method: '',
      shipping_method: 'free',
      terms: false
    }
  });

  useEffect(() => {
    if (cartShippingAddress) {
      reset({
        shipping_first_name: cartShippingAddress.first_name,
        shipping_last_name: cartShippingAddress.last_name,
        shipping_company: cartShippingAddress.company,
        shipping_country: cartShippingAddress.country,
        shipping_address_1: cartShippingAddress.address_1,
        shipping_city: cartShippingAddress.city,
        shipping_state: cartShippingAddress.state,
        shipping_postcode: cartShippingAddress.postcode,
        // shipping_method: cartShippingAddress.method,
      })
    }
    if (cartBillingAddress) {
      reset({
        billing_first_name: cartBillingAddress.first_name,
        billing_last_name: cartBillingAddress.last_name,
        billing_company: cartBillingAddress.company,
        billing_country: cartBillingAddress.country,
        billing_address_1: cartBillingAddress.address_1,
        billing_city: cartBillingAddress.city,
        billing_state: cartBillingAddress.state,
        billing_postcode: cartBillingAddress.postcode,
        billing_phone: cartBillingAddress.phone,
        billing_email: cartBillingAddress.email,
        // survey: cartBillingAddress.survey,
      })
    }
  }, [reset, cartShippingAddress, cartBillingAddress, trigger]);


  const watchFields = watch();

  // Show warning if field is empty (not required)
  const showErrorIfMissing = (fieldValue) => {
    return !fieldValue ? true : null;
  };

  const [countryDetails, setCountryDetails] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState(null);


  console.log(cartShippingAddress, 'cartShippingAddress');



  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const data = await getPaymentMethods();
      setPaymentMethods(data);
    };
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    if (watchFields.billing_country) {
      const fetchCountryDetails = async () => {
        const data = await getCountryDetails(watchFields.billing_country);
        setCountryDetails(data);
      };
      fetchCountryDetails();
    }
  }, [watchFields.billing_country, setCountryDetails])

  const states = countryDetails?.states || [];

  const cartTotal = parseFloat(cart?.totals?.total_price).toFixed(2) / 100;
  const sousTotal = cart?.items?.reduce(
    (acc, item) =>
      acc +
      Number(item.totals.line_subtotal) +
      Number(item.totals.line_subtotal_tax),
    0
  ) / 100;

  const [shippingLoading, setShippingLoading] = useState(false);
  const [selectedRateId, setSelectedRateId] = useState(null);

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
    setShippingLoading(true);
    const result = await selectShippingRate(rateId, packageId);
    if (result.success) {
      setSelectedRateId(rateId);
      await loadCart();
      setShippingLoading(false);
    }
  };



  return (
    <div>
      {/* Steps */}
      <div className='flex items-center justify-between max-w-[1080px] mx-auto relative py-[80px] lg:py-[100px]'>
        <div className='flex flex-col items-center justify-center step-1'>
          <span className='w-[clamp(1.75rem,1.0594rem+1.4406vw,2.5rem)] h-[clamp(1.75rem,1.0594rem+1.4406vw,2.5rem)] text-[clamp(0.9375rem,0.362rem+1.2005vw,1.5625rem)] font-bold  rounded-full text-center text-white z-10! bg-[#1D98FF]'>1</span>
          <span className='text-base text-[clamp(0.875rem,0.7599rem+0.2401vw,1rem)] text-center leading-[120%]'>
            Basket
          </span>
        </div>
        <div className='flex flex-col items-center justify-center step-2'>
          <span className='w-[clamp(1.75rem,1.0594rem+1.4406vw,2.5rem)] h-[clamp(1.75rem,1.0594rem+1.4406vw,2.5rem)] text-[clamp(0.9375rem,0.362rem+1.2005vw,1.5625rem)] font-bold  rounded-full text-center text-white z-10! bg-[#1D98FF]'>2</span>
          <span className='text-base text-[clamp(0.875rem,0.7599rem+0.2401vw,1rem)] text-center leading-[120%]'>
            Secure payment and delivery
          </span>
        </div>
        <div className='flex flex-col items-center justify-center step-3'>
          <span className='w-[clamp(1.75rem,1.0594rem+1.4406vw,2.5rem)] h-[clamp(1.75rem,1.0594rem+1.4406vw,2.5rem)] border border-[#111] text-[clamp(0.9375rem,0.362rem+1.2005vw,1.5625rem)] font-bold text-[#111] rounded-full text-center bg-white z-10!'>3</span>
          <span className='text-base text-[clamp(0.875rem,0.7599rem+0.2401vw,1rem)] text-center leading-[120%]'>
            Summary
          </span>
        </div>
      </div>
      {/*  */}
      <div className='global-padding global-margin'>
        {/* checkout forms */}
        <form className='space-y-10'>

          {/* 1st section */}
          <div className='grid grid-cols-1 gap-10 lg:grid-cols-2'>
            {/* Billing address */}
            <div className='flex flex-col lg:gap-8 gap-6'>
              <h3 className='lg:text-[28px] text-[22px] leading-[100%] font-semibold text-[#111]'>Détails de facturation</h3>
              <div className='grid grid-cols-1 gap-5'>
                <div className='grid grid-cols-2 gap-5'>
                  <Input
                    label="First Name"
                    type="text"
                    id="billing_first_name"
                    register={register("billing_first_name", { required: true })}
                    error={showErrorIfMissing(watchFields.billing_first_name)}
                    value={watchFields.billing_first_name}
                    checkout={true}
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    id="billing_last_name"
                    register={register("billing_last_name", { required: true })}
                    error={showErrorIfMissing(watchFields.billing_last_name)}
                    value={watchFields.billing_last_name}
                    checkout={true}
                  />
                </div>
                <Input
                  label="Company (Optional)"
                  type="text"
                  id="billing_company"
                  register={register("billing_company", { required: false })}
                  error={showErrorIfMissing(watchFields.billing_company)}
                  value={watchFields.billing_company}
                  checkout={true}
                />
                <CountrySelect
                  label="Country"
                  id="country"
                  defaultValue={watchFields.billing_country}
                  register={register("billing_country", { required: true })}
                  checkout={true}
                  countries={countriesList}
                />
                <Input
                  label="Street number and name"
                  type="text"
                  id="billing_address_1"
                  register={register("billing_address_1", { required: true })}
                  error={showErrorIfMissing(watchFields.billing_address_1)}
                  value={watchFields.billing_address_1}
                  checkout={true}
                />
                <Input
                  label="Ville"
                  type="text"
                  id="billing_city"
                  register={register("billing_city", { required: true })}
                  error={showErrorIfMissing(watchFields.billing_city)}
                  value={watchFields.billing_city}
                  checkout={true}
                />
                {
                  states.length > 0 && (
                    <Select
                      label="State"
                      id="billing_state"
                      register={register("billing_state", { required: true })}
                      error={showErrorIfMissing(watchFields.billing_state)}
                      value={watchFields.billing_state}
                      checkout={true}
                      options={[...(states.map((state) => ({ value: state.code, label: state.name })))]}
                    />
                  )
                }
                <Input
                  label="Code Postal"
                  type="text"
                  id="billing_postcode"
                  register={register("billing_postcode", { required: true })}
                  error={showErrorIfMissing(watchFields.billing_postcode)}
                  value={watchFields.billing_postcode}
                  checkout={true}
                />
                <Select
                  checkout={true}
                  label='Comment avez-vous entendu parlé de la marque ?'
                  id='survey'
                  register={register("survey", { required: true })}
                  error={showErrorIfMissing(watchFields.survey)}
                  value={watchFields.survey}
                  options={[
                    { value: 'Recherche Google/Bing', label: 'Recherche Google/Bing' },
                    { value: 'facebook', label: 'Facebook' },
                    { value: 'instagram', label: 'Instagram' },
                    { value: 'youtube', label: 'YouTube' },
                    { value: 'Publicité Google (Google Ads)', label: 'Publicité Google (Google Ads)' },
                    { value: "Recommandation d'un ami ou d'un membre de la famille", label: "Recommandation d'un ami ou d'un membre de la famille" },
                    { value: "Article de blog ou revue en ligne", label: "Article de blog ou revue en ligne" },
                    { value: "Lien direct (j'ai tapé l'adresse du site)", label: "Lien direct (j'ai tapé l'adresse du site)" },
                    { value: "Publicité Display/Bannière", label: "Publicité Display/Bannière" },
                    { value: "Autre (veuillez préciser)", label: "Autre (veuillez préciser)" },
                  ]}
                  placeholder="Veuillez sélectionner..."
                />
              </div>
            </div>
            {/* Shipping address */}
            <div className='flex flex-col lg:gap-8 gap-6'>
              <div className='flex items-center gap-1 flex-wrap'>
                <input onChange={handleShow} type="checkbox" id='shipping_address' />
                <h3 className='lg:text-[28px] text-[22px] leading-[100%] font-semibold text-[#111]'>Détails de livraison</h3>
              </div>
              {
                shippingAddress && (
                  <div className='grid grid-cols-1 gap-5'>
                    <div className='grid grid-cols-2 gap-5'>
                      {/*  */}
                      <Input
                        checkout={true}
                        label='First Name'
                        type='text'
                        id='shipping_first_name'
                        register={register("shipping_first_name", { required: true })}
                        error={showErrorIfMissing(watchFields.shipping_first_name)}
                        value={watchFields.shipping_first_name}
                      />

                      <Input
                        checkout={true}
                        label='Last Name'
                        type='text'
                        id='shipping_last_name'
                        register={register("shipping_last_name", { required: true })}
                        error={showErrorIfMissing(watchFields.shipping_last_name)}
                        value={watchFields.shipping_last_name}
                      />
                    </div>
                    <Input
                      checkout={true}
                      label='Company (Optional)'
                      type='text'
                      id='shipping_company'
                      register={register("shipping_company", { required: false })}
                      error={showErrorIfMissing(watchFields.shipping_company)}
                      value={watchFields.shipping_company}
                    />
                    <Input
                      checkout={true}
                      label='Country'
                      type='text'
                      id='shipping_country'
                      register={register("shipping_country", { required: true })}
                      error={showErrorIfMissing(watchFields.shipping_country)}
                      value={watchFields.shipping_country}
                    />
                    <Input
                      checkout={true}
                      label='Post Code'
                      type='text'
                      id='zip'
                      register={register("shipping_postcode", { required: true })}
                      error={showErrorIfMissing(watchFields.shipping_postcode)}
                      value={watchFields.shipping_postcode}
                    />
                    <Input
                      checkout={true}
                      label='State'
                      type='text'
                      id='state'
                      register={register("shipping_state", { required: true })}
                      error={showErrorIfMissing(watchFields.shipping_state)}
                      value={watchFields.shipping_state}
                    />

                    <Input
                      checkout={true}
                      label='City'
                      type='text'
                      id='city'
                      register={register("shipping_city", { required: true })}
                      error={showErrorIfMissing(watchFields.shipping_city)}
                      value={watchFields.shipping_city}
                    />

                    <Input
                      checkout={true}
                      label='Street number and name'
                      type='text' id='street_number_and_name'
                      register={register("shipping_address_1", { required: true })}
                      error={showErrorIfMissing(watchFields.shipping_address_1)}
                      value={watchFields.shipping_address_1}
                    />

                  </div>
                )
              }
              <div className='relative'>
                <label
                  htmlFor='comments'
                  className='bg-white absolute left-3 font-semibold -top-[14px] text-[#666] text-sm leading-[28px] uppercase'
                >
                  Notes de commande (facultatif)
                </label>
                <textarea
                  id='comments'
                  className='border border-[#BFBFBF] rounded-[4px] w-full py-3 px-3 focus:outline-none text-lg leading-[23px] text-black font-semibold min-h-[120px] resize-y'
                  placeholder='Commentaires concernant votre commande, ex. : consignes de livraison.'
                />
              </div>
            </div>
          </div>

          {/* 2nd section */}
          <div className=''>
            <h3 className='lg:text-[28px] text-[22px] leading-[100%] font-semibold text-[#111] block mb-6'>Votre commande</h3>
            <table className='w-full border border-[#111]'>
              <thead>
                <tr className='border-b border-[#111]'>
                  <th className='!px-3 py-2 text-left'>Produit</th>
                  <th className='!px-3 py-2 !border-l text-left border-[#111]'>Sous-total</th>
                </tr>
              </thead>
              <tbody>
                {
                  items?.map((singleItem, i) => {
                    const totalPrice = parseFloat(singleItem?.totals?.line_subtotal) / 100 + parseFloat(singleItem?.totals?.line_subtotal_tax) / 100;
                    return (
                      <>
                        <tr className='border-b border-[#111]'>
                          <td className='!px-3 py-2 text-left'>{singleItem?.name} x {singleItem?.quantity}</td>
                          <td className='!px-3 py-2 !border-l text-left border-[#111]'>{totalPrice} {singleItem?.totals?.currency_symbol} (TTC)</td>
                        </tr>
                      </>
                    )
                  })
                }
              </tbody>
              <tfoot>
                <tr className='border-b border-[#111]'>
                  <th className='!px-3 py-2 text-left'>Sous-total</th>
                  <td className='!px-3 py-2 !border-l text-left border-[#111]'>{sousTotal} {cart?.totals?.currency_symbol} (TTC)</td>
                </tr>
                <tr className='border-b border-[#111]'>
                  <th className='!px-3 py-2 text-left'>Shipping</th>
                  <td className={`!px-3 py-2 !border-l text-left border-[#111]`}>
                    <div>
                      <ul className={`space-y-2 ${shippingLoading ? 'opacity-50' : 'opacity-100'}`}>
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
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className='!px-3 py-2 text-left'>Total</th>
                  <td className='!px-3 py-2 !border-l text-left border-[#111] flex items-center gap-1'>
                    <span>
                      <strong>{cartTotal}{cart?.totals?.currency_symbol}</strong>
                    </span>
                    <span>
                      (dont <strong>{Number(cart?.totals?.total_tax).toFixed(2) / 100} {cart?.totals?.currency_symbol}</strong> TVA)
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* 3rd section */}
          <div className='bg-[#F7F7F7]'>
            <ul className='flex flex-col gap-2 p-4 border-b border-[#DDD8E3]'>
              {
                paymentMethods?.map((method, i) => {
                  return (
                    <li key={i} className='flex flex-col gap-3'>
                      <div className='flex items-center gap-1'>
                        <input type="radio" name="payment_method" value={method?.id} id="" />
                        <label htmlFor="" className=''>{method?.title}</label>
                        {/* <Image/> */}
                      </div>
                      <div className='bg-[#DDD8E3] rounded-sm p-3 hidden'>
                        <p>Payer avec Paypal</p>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            <div className='flex flex-col gap-2 p-4'>
              <p>Your personal data will be used to process your order, assist you during your visit to the website, and for other reasons described in our
                <Link href="/privacy-policy" className='inline'>privacy policy</Link>
              </p>
              <div className='flex items-center gap-1'>
                <input required type="checkbox" name="" id="" />
                <label htmlFor="">I have read and agree to the website terms and conditions </label>
              </div>
              <button className='w-fit ml-auto text-white bg-[#1D98FF] rounded-sm px-[50px] uppercase py-[18px] font-semibold'>Proceed to paypal</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Page;