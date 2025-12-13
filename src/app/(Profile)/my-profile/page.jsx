import { Pen, PenTool } from 'lucide-react';
import FormButton from '../../../Shared/Button/FormButton';
import Input from '../../../Shared/Input/input';
import React from 'react';

const page = () => {
    return (
        <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)]'>
            <div className='space-y-[clamp(0.875rem,0.5297rem+0.7203vw,1.25rem)]'>
                <h2 className='global-h2'>User information</h2>
                <p className='profile-p'>Here you can enter or edit public information about yourself. The data will be used in the future for ordering. The changes you make will be displayed immediately after saving.</p>

            </div>
            <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)]'>
                <div className=''>
                    <div className='flex items-center justify-between pb-1 global-b-bottom'>
                        <h3 className='text-[28px] leading-[100%] font-semibold text-[#111]'>Full name</h3>
                        <button className='flex items-center gap-1'>
                            <Pen className='w-3 h-3' />
                            <span className='text-sm uppercase leading-[100%]'>Modifier</span>
                        </button>
                    </div>
                    <form className='mt-6'>
                        <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 2xl:grid-cols-3'>
                            <div className=''>
                                <Input label={"First Name"} type={'text'} id={"first_name"} />
                            </div>
                            <div className=''>
                                <Input label={"Last Name"} type={'text'} id={"last_name"} />
                            </div>
                            <div className=''>
                                <Input label={"Display Name"} type={'text'} id={"display_name"} />
                            </div>
                        </div>
                        <div className='mt-5'>
                            <FormButton label={"ENREGISTRER LES MODIFICATIONS"} />
                        </div>
                    </form>
                </div>
                <div className=''>
                    <div className='flex items-center justify-between pb-1 global-b-bottom'>
                        <h3 className='text-[28px] leading-[100%] font-semibold text-[#111]'>Contact info</h3>
                        <button className='flex items-center gap-1'>
                            <Pen className='w-3 h-3' />
                            <span className='text-sm uppercase leading-[100%]'>Modifier</span>
                        </button>
                    </div>
                    <form className='mt-6'>
                        <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 2xl:grid-cols-3'>
                            <div className=''>
                                <Input label={"Numéro de téléphone"} type={'tel'} id={"phone"} />
                            </div>
                            <div className=''>
                                <Input label={"Adresse e-mail"} type={'email'} id={"email"} />
                            </div>
                        </div>
                        <div className='mt-5'>
                            <FormButton label={"ENREGISTRER LES MODIFICATIONS"} />
                        </div>
                    </form>
                </div>
                <div className=''>
                    <div className='flex items-center justify-between pb-1 global-b-bottom'>
                        <h3 className='text-[28px] leading-[100%] font-semibold text-[#111]'>Adresse de facturation</h3>
                        <button className='flex items-center gap-1'>
                            <Pen className='w-3 h-3' />
                            <span className='text-sm uppercase leading-[100%]'>Modifier</span>
                        </button>
                    </div>
                    <form className='mt-6'>
                        <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 2xl:grid-cols-3'>
                            <div className=''>
                                <Input label={"First Name"} type={'text'} id={"first_name"} />
                            </div>
                            <div className=''>
                                <Input label={"Last Name"} type={'text'} id={"last_name"} />
                            </div>
                            <div className=''>
                                <Input label={"Company (Optional)"} type={'text'} id={"company"} />
                            </div>
                            <div className=''>
                                <Input label={"Company (Optional)"} type={'text'} id={"company"} />
                            </div>
                            <div className=''>
                                <Input label={"Code Postal"} type={'number'} id={"postal"} />
                            </div>
                            <div className=''>
                                <Input label={"Ville"} type={'text'} id={"ville"} />
                            </div>
                            <div className='lg:col-span-2 col-span-1'>
                                <Input label={"Street number and name"} type={'text'} id={"street number"} />
                            </div>
                            <div className=''>
                                <Input label={"Téléphone"} type={'tel'} id={"phone"} />
                            </div>
                            <div className=''>
                                <Input label={"E-mail"} type={'email'} id={"email"} />
                            </div>
                        </div>
                        <div className='mt-5'>
                            <FormButton label={"ENREGISTRER LES MODIFICATIONS"} />
                        </div>
                    </form>
                </div>
                <div className=''>
                    <div className='flex items-center justify-between pb-1 global-b-bottom'>
                        <h3 className='text-[28px] leading-[100%] font-semibold text-[#111]'>Adresse de livraison</h3>
                        <button className='flex items-center gap-1'>
                            <Pen className='w-3 h-3' />
                            <span className='text-sm uppercase leading-[100%]'>Modifier</span>
                        </button>
                    </div>
                    <form className='mt-6'>
                        <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 2xl:grid-cols-3'>
                            <div className=''>
                                <Input label={"Entreprise"} type={'text'} id={"entreprise"} />
                            </div>
                            <div className=''>
                                <Input label={"Country"} type={'text'} id={"country"} />
                            </div>
                            <div className=''>
                                <Input label={"Code Postal"} type={'number'} id={"postal"} />
                            </div>
                            <div className=''>
                                <Input label={"Ville"} type={'text'} id={"ville"} />
                            </div>
                            <div className='lg:col-span-2'>
                                <Input label={"Adresse"} type={'text'} id={"adresse"} />
                            </div>

                        </div>
                        <div className='mt-5'>
                            <FormButton label={"ENREGISTRER LES MODIFICATIONS"} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default page;