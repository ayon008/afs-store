"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input/input';
import FormButton from '../Button/FormButton';
import Link from 'next/link';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log("FORM DATA:", data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='max-w-[420px] w-full py-[50px] px-[35px] bg-[#F0F0F0] rounded-[4px]'>
            <h1 className='lg:text-5xl lg:leading-[53px] font-bold mb-8 text-2xl leading-[26px] lg:text-left text-center'>S’inscrire</h1>
            <div className='mb-7'>
                <Input
                    label='First Name'
                    id='first_name'
                    type='text'
                    placeholder=''
                    register={register("first_name", { required: "First Name is Required" })}
                    error={errors.first_name?.message}
                />
            </div>
            <div className='mb-7'>
                <Input
                    label='Last Name'
                    id='last_name'
                    type='text'
                    placeholder=''
                    register={register("last_name", { required: "Last Name is Required" })}
                    error={errors.last_name?.message}
                />
            </div>
            <div className='mb-7'>
                <Input
                    label='Adresse e-mail'
                    id='email'
                    type='email'
                    placeholder=''
                    register={register("email", { required: "Email is Required" })}
                    error={errors.email?.message}
                />
            </div>
            <div className='mb-7'>
                <Input
                    label='Mot de passe'
                    id='password'
                    type='password'
                    placeholder=''
                    register={register("password", { required: "Password is Required" })}
                    error={errors.password?.message}
                />
            </div>
            <div className='flex items-center mt-6 gap-1'>
                <input type='checkbox' {...register("yes")} />
                <p className='text-[15px] leading-[19px]'>I would like to receive exclusive offers</p>
            </div>
            <div className='mt-6'>
                <p className='text-sm font-semibold leading-[17px]'>Your personal data will be used to assist you during your visit to the website, manage access to your account, and for other reasons described in our <span className='text-[#1D98FE]'>politique de confidentialité</span>.</p>
            </div>
            <div className="mt-6 flex items-center justify-center">
                <FormButton type='submit' label={"sign up"} />
            </div>
            <div className='mt-6 font-semibold text-base leading-[24px] text-center'>
                <Link href={'/login'} className='underline'>
                    Sign in with another email address
                </Link>
            </div>
        </form>
    );
};

export default Register;