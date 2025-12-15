"use client"
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, X } from "lucide-react";
import PopUp from '../Team/PopUp';
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { getPrice } from '../../funtions/getWooCommerce';
import useCart from '../../hooks/useCart';


const ProductDetails = ({ data }) => {


    const [priceLoading, setLoading] = useState(true);

    const { register, handleSubmit, watch } = useForm();
    const [variationPrice, setVariationPrice] = useState(null);
    const [isReady, setIsReady] = useState(true);
    const [variationId, setVariationId] = useState(null);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const productId = data?.id;


    const { handleAddToCart } = useCart();

    const onSubmit = async (formData) => {
        const matchedVariation = await getPrice(productId, formData);
        setVariationPrice(matchedVariation.price);
        setVariationId(matchedVariation.id);
        setSelectedAttributes(formData);
        setLoading(false);
        const result = await handleAddToCart(productId, 1, matchedVariation.id || null, formData);
        console.log(result, 'result');
    };

    const [isOpen, setOpen] = useState(false);


    const acf = data?.acf;

    // for Pop Up
    const compatibilite = acf?.compatibilite;
    const short_description = data?.short_description;
    const price = data?.price_html;
    const attributes = data?.attributes;

    // useEffect(() => {
    //     if (!attributes) return;

    //     // Build selected values object
    //     const selected = attributes.reduce((acc, attr) => {
    //         acc[attr.name] = watch(attr.name);
    //         return acc;
    //     }, {});

    //     // Check if all fields are selected
    //     const allSelected = Object.values(selected).every(Boolean);

    //     // Update button state
    //     setIsReady(allSelected);

    //     // If all selected → auto fetch price
    //     if (allSelected) {
    //         onSubmit(selected);
    //     }

    // }, [watch(), attributes]);


    // const handleCart = async () => {
       

    // }



    return (
        <>
            <div>
                <h1 className="text-[clamp(2rem,1.6547rem+0.7203vw,2.375rem)] font-bold leading-[100%] lg:mt-3">{data?.name}</h1>
                <div className='mt-2 mb-3 text-[15px] leading-[22px] font-semibold' dangerouslySetInnerHTML={{ __html: short_description }} />
                <div className='text-lg leading-[29px] font-bold mb-6' dangerouslySetInnerHTML={{ __html: price }} />
                <button onClick={() => setOpen(true)} className='text-[#1D98FF] text-base leading-[100%] font-semibold cursor-pointer'>
                    <span>Guide taille</span>
                    <span className='inline'><ArrowUpRight className='inline ml-1' size={'1.1rem'} strokeWidth={2.5} /></span>
                </button>


                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-[30px] mt-5">
                    <div className="flex flex-col gap-4">
                        <table>
                            <tbody className="flex flex-col gap-5">
                                {attributes?.map((singleAttribute, index) => {
                                    const fieldName = singleAttribute.name;
                                    const selectedValue = watch(fieldName);
                                    return (
                                        <tr key={index} className="flex flex-col gap-[6px]">
                                            <th className="font-bold text-left p-0!">
                                                <label className='font-semibold text-base leading-[100%] text-left'>
                                                    {singleAttribute?.name}
                                                    {selectedValue && (
                                                        <span className="">
                                                            {" "} : {selectedValue}
                                                        </span>
                                                    )}
                                                </label>
                                            </th>
                                            <td>
                                                <ul className="flex flex-wrap gap-1">
                                                    {singleAttribute.options?.map((singleOption, idx) => (
                                                        <li key={idx}>
                                                            <label
                                                                className={`text-base leading-[130%] border-[2px] border-[#999]! cursor-pointer px-2 py-1 flex items-center justify-center font-semibold rounded-[34px] text-[#111111bf]
                                                ${watch(fieldName) === singleOption
                                                                        ? "bg-[#111111bf] text-white"
                                                                        : "border-black text-[#111111bf]"
                                                                    }
                                                `}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    value={singleOption}
                                                                    {...register(fieldName, { required: true })}
                                                                    className="hidden"
                                                                />
                                                                {singleOption}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className='space-y-4'>
                        {/* Price */}
                        {
                            variationPrice && isReady && <span className={`text-[#111] font-bold text-[24px] leading-[110%] block ${priceLoading ? "opacity-50" : "opacity-100"}`}>{parseFloat(variationPrice)?.toFixed(2)}€</span>
                        }

                        {/* Button */}
                        <button
                            disabled={!isReady}
                            className={`text-base leading-[100%] uppercase font-bold w-full rounded-sm min-h-[46px] flex items-center justify-center cursor-pointer ${isReady ? "bg-[#1D98FF] text-white" : "bg-[#1D98FF]/50 text-white cursor-not-allowed"}`}
                            type="submit"
                        >
                            AJOUTER AU PANIER
                        </button>

                    </div>
                </form>

                {/* Other Details */}
                <div className='space-y-10 mt-10'>
                    <div className='space-y-2'>
                        <p className='text-base leading-[100%] font-bold'>Garantie</p>
                        <small className='text-[15px] leading-[19px] block'>Tous nos produits sont garantis 2 ans</small>
                    </div>
                    <div className='space-y-2'>
                        <p className='text-base leading-[100%] font-bold'>Après vente</p>
                        <small className='text-[15px] leading-[19px] block'>Retour gratuit sous 15 jours</small>
                    </div>
                    <div className='space-y-2'>
                        <p className='text-base leading-[100%] font-bold'>Modes de paiement</p>
                        <small className='text-[15px] leading-[19px] block'>Paiement sécurisé. Simple et rapide.</small>
                        <div className='flex items-center gap-4 mt-4'>
                            <Image src={'https://afs-foiling.com/fr/wp-content/uploads/2025/05/Layer_1-1.svg'} alt='visa' width={50} height={50} />
                            <Image src={'https://afs-foiling.com/fr/wp-content/uploads/2025/05/Group-26.svg'} alt='visa' width={50} height={50} />
                            <Image src={'https://afs-foiling.com/fr/wp-content/uploads/2025/05/svg3409-1.svg'} alt='visa' width={50} height={50} />
                            <Image src={'https://afs-foiling.com/fr/wp-content/uploads/2025/05/image-7.svg'} alt='visa' width={50} height={50} />
                        </div>
                    </div>
                </div>
                <div className='flex items-stretch bg-[#F0F0F0] mt-10'>
                    <div className='p-4 2xl:w-[60%] w-full'>
                        <div className="space-y-2">
                            <p className='text-xs font-semibold text-[#666666]'>Expert produit AFS</p>
                            <h3 className='font-bold text-base leading-[24px]'>Besoin d'aide pour choisir votre matériel ?</h3>
                            <p className='text-[15px] leading-4 text-[#666666]/75'>Nous sommes là pour vous apporter des réponses complètes et des conseils qui vous aideront à faire le bon choix.</p>
                        </div>
                        <p className='text-xs leading-4 font-semibold mt-8 uppercase text-[#3F98FF]'>Prendre un rdv téléphonique <ArrowUpRight className='inline w-4 h-4' /></p>
                    </div>
                    <div className='2xl:w-[40%] w-0'>
                        <Image src={'https://afs-foiling.com/fr/wp-content/uploads/2025/06/image-33-1.png.webp'} className='aspect-[1] w-full h-full' alt='' width={200} height={200} />
                    </div>
                </div>
            </div>


            {/* Pop Up */}
            <PopUp isOpen={isOpen}>
                <div className='bg-white max-w-[920px] w-[95%] p-5 relative mx-auto rounded-[4px]'>
                    <div className='global-b-bottom pb-2'>
                        {/* Absolute Button for closing Pop Up */}
                        <button onClick={() => setOpen(false)} className='border border-black rounded-full w-fit h-fit p-[5px] absolute top-[10px] right-4 cursor-pointer '>
                            <X className="w-4 h-4" />
                        </button>
                        <h2 className='text-[clamp(1.375rem,1.1448rem+0.4802vw,1.625rem)] leading-[100%] font-bold'>Guide des tailles</h2>

                    </div>
                    <div className='lg:mt-4 mt-0'>
                        <div className='font-bold compatibilite' dangerouslySetInnerHTML={{ __html: compatibilite }} />
                    </div>
                </div>
            </PopUp>
        </>
    );
};

export default ProductDetails;