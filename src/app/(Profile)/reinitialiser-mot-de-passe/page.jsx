import { ArrowUpRight, Pen } from 'lucide-react';
import FormButton from '../../../Shared/Button/FormButton';
import Input from '../../../Shared/Input/input';
import React from 'react';

const page = () => {
    return (
        <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)]'>
            <div className='space-y-[clamp(0.875rem,0.5297rem+0.7203vw,1.25rem)]'>
                <h2 className='global-h2'>Réinitialiser le mot de passe</h2>
                <p className='profile-p'>Vous pouvez modifier votre mot de passe actuel en toute sécurité et facilement afin de renforcer la sécurité de votre compte sur cette page. Vous pouvez également utiliser cette page pour réinitialiser votre mot de passe si vous l'oubliez.</p>

            </div>
            <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)]'>
                <div className=''>
                    <div className='flex items-center justify-between pb-1 global-b-bottom'>
                        <h3 className='text-[28px] leading-[100%] font-semibold text-[#111]'>Définir un nouveau mot de passe</h3>
                        <button className='flex items-center gap-1'>
                            <Pen className='w-3 h-3' />
                            <span className='text-sm uppercase leading-[100%]'>Modifier</span>
                        </button>
                    </div>
                    <form className='mt-6'>
                        <div className='grid grid-cols-1 grid-rows-3 gap-5 2xl:grid-cols-3'>
                            <div className='max-w-[320px] w-full'>
                                <Input label={"Mot de passe actuel"} type={'password'} id={"first_name"} />
                            </div>
                            <div className='max-w-[320px] w-full'>
                                <Input label={"Nouveau mot de passe"} type={'text'} id={"last_name"} />
                            </div>
                            <div className='max-w-[320px] w-full'>
                                <Input label={"Nouveau mot de passe à nouveau"} type={'text'} id={"display_name"} />
                            </div>
                        </div>
                        <div className='mt-5 flex items-center flex-wrap gap-10'>
                            <FormButton label={"ENREGISTRER"} />
                            <button className='text-base uppercase flex items-center gap-1'>
                                <span>Forgot password</span>
                                <ArrowUpRight className='inline w-5 h-5'/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default page;