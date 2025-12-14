"use client"
import React, { useState } from 'react';
import Input from "../Input/input"
import Password from "../Input/Password"
import FormButton from "../Button/FormButton"
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { loginUser } from "../../funtions/getRegisterStoreUser"
import { useRouter } from 'next/navigation';
import useAuth from '../../hooks/use-auth';
import { AlertCircle } from "lucide-react";

const Login = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const { refreshUser } = useAuth();


    const [errorMessage, setErrorMessage] = useState(null);


    const onSubmit = async (data) => {

        const { email, password, remember } = data;
        try {
            const response = await loginUser({ username: email, password: password, remember: !!remember });

            if (response && response.data && response.data.status === 403) {
                setErrorMessage("The provided password is an invalid application password.");
                return;
            }

            if (response.token) {
                reset();
                try {
                    await refreshUser();
                } catch (e) {
                    console.warn('refreshUser failed', e);
                }
                router.push('/my-profile');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {
                errorMessage && (
                    <div className='flex items-center gap-x-3 border-[#8b0000] border-2 py-4 px-8 mt-6 rounded-sm bg-[#F9F2F5]'>
                        <AlertCircle className='inline text-white fill-[#8b0000]' />
                        <p className='text-base leading-[100%] font-semibold text-[#8b0000]'>
                            {errorMessage === "The provided password is an invalid application password." ? <>
                                <span className='font-bold uppercase'>ERROR</span> : The username or password you entered is incorrect.<Link href={'/'} className='text-[#47AAFD] inline'> Lost your password</Link>?
                            </> : "Something went wrong"}
                        </p>
                    </div>
                )
            }

            <div className='flex items-center justify-center lg:mt-[80px] mt-[40px] global-margin'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit(onSubmit)();
                        }
                    }}
                    className='max-w-[420px] w-full py-[50px] px-[35px] bg-[#F0F0F0] rounded-[4px]'
                >
                    <h1 className='lg:text-5xl lg:leading-[53px] font-bold mb-8 text-2xl leading-[26px] text-center'>Se connecter</h1>

                    <div className='mb-7'>
                        <Input
                            label='Identifiant ou e-mail'
                            id='email'
                            type='text'
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
                            <Link href='/signup'>
                                <FormButton label='sign up' />
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
