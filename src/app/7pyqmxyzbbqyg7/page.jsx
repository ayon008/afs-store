import FormButton from '../../Shared/Button/FormButton';
import Input from '../../Shared/Input/input';
import React from 'react';

const page = () => {
    return (
        <div className='pt-4 global-padding'>
            <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)] bg-[#F0F0F0] p-[clamp(1.25rem,0.099rem+2.401vw,2.5rem)]'>
                <div className='space-y-[clamp(0.875rem,0.5297rem+0.7203vw,1.25rem)]'>
                    <h2 className='global-h2'>Mot de passe oublié ?</h2>
                    <p className='small-p'>Entrez l'adresse e-mail que vous avez utilisée pour créer votre compte, et vous recevrez un lien pour réinitialiser votre mot de passe.</p>

                </div>
                <div className='space-y-[clamp(2.5rem,1.349rem+2.401vw,3.75rem)]'>
                    <div className=''>
                        <div className='flex items-center justify-between pb-1 global-b-bottom'>
                            <h3 className='text-[28px] leading-[100%] font-semibold text-[#111]'>Définir un nouveau mot de passe</h3>
                        </div>
                        <form className='mt-6'>
                            <div className=''>
                                <div className='max-w-[320px] w-full'>
                                    <Input label={"Identifiant ou e-mail"} type={'email'} id={"first_name"} />
                                </div>
                            </div>
                            <div className='mt-5 flex items-center flex-wrap gap-10'>
                                <FormButton label={"ENREGISTRER"} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;