"use client"
import React from 'react';
import Input from "../Input/input"
import Password from "../Input/Password"
import FormButton from "../Button/FormButton"
import Link from 'next/link';
import { useForm } from "react-hook-form";

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log("FORM DATA:", data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-[420px] w-full py-[50px] px-[35px] bg-[#F0F0F0] rounded-[4px]'
        >
            <h1 className='lg:text-5xl lg:leading-[53px] font-bold mb-8'>Se connecter</h1>

            <div className='mb-7'>
                <Input
                    label='Identifiant ou e-mail'
                    id='email'
                    type='email'
                    placeholder=''
                    register={register("email", { required: "Email is required" })}
                    error={errors.email?.message}
                />
            </div>

            <div className='mb-4'>
                <Password
                    label='Mot de passe'
                    id='password'
                    placeholder=''
                    register={register("password", { required: "Password is required" })}
                    error={errors.password?.message}
                />
            </div>

            <p className='text-center text-sm leading-[100%] underline'>Mot de passe perdu ?</p>

            <div className='flex items-center justify-center mt-6 gap-1'>
                <input type='checkbox' {...register("remember")} />
                <p className='text-[15px] leading-[19px]'>Se souvenir de moi</p>
            </div>

            <div className='flex items-center justify-center mt-3'>
                <FormButton type="submit" label="SE CONNECTER" />
            </div>

            <div className='mt-6'>
                <p className='text-[15px] leading-[19px] text-center mb-4'>New to the website?</p>
                <div className='flex items-center justify-center'>
                    <Link href='/register'>
                        <FormButton label='sign up' />
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default Login;
