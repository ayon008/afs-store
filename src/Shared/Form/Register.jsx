"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/input";
import FormButton from "../Button/FormButton";
import Password from "../Input/Password";
import Link from "next/link";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        mode: "onChange", // live validation
    });

    const onSubmit = (data) => {
        console.log("FORM DATA:", data);
    };

    // watch values for live validation and "Ayon" display
    const firstNameValue = watch("first_name") || "";
    const lastNameValue = watch("last_name") || "";
    const emailValue = watch("email") || "";
    const passwordValue = watch("password") || "";

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[420px] w-full py-[50px] px-[35px] bg-[#F0F0F0] rounded-[4px]"
        >
            <h1 className="lg:text-5xl lg:leading-[53px] font-bold mb-8 text-2xl leading-[26px] lg:text-left text-center">
                S’inscrire
            </h1>

            {/* FIRST NAME */}
            <div className="mb-7">
                <Input
                    label="First Name"
                    id="first_name"
                    type="text"
                    placeholder=""
                    register={register("first_name", {
                        validate: (value) => {
                            // if (value.length < 2) return true; // no error before 2 letters
                            return value ? true : "First Name is Required";
                        },
                    })}
                    error={errors.first_name?.message}
                    registerPage={true}
                    value={firstNameValue}
                />
            </div>

            {/* LAST NAME */}
            <div className="mb-7">
                <Input
                    label="Last Name"
                    id="last_name"
                    type="text"
                    placeholder=""
                    register={register("last_name", {
                        validate: (value) => {
                            // if (value.length < 2) return true;
                            return value ? true : "Last Name is Required";
                        },
                    })}
                    error={errors.last_name?.message}
                    registerPage={true}
                    value={lastNameValue}
                />
            </div>

            {/* EMAIL */}
            <div className="mb-7">
                <Input
                    label="Adresse e-mail"
                    id="email"
                    type="email"
                    placeholder=""
                    register={register("email", {
                        validate: (value) => {
                            // if (value.length < 2) return true;
                            const valid = /\S+@\S+\.\S+/.test(value);
                            return valid ? true : "Enter a valid email address";
                        },
                    })}
                    error={errors.email?.message}
                    registerPage={true}
                    value={emailValue}
                />
            </div>

            {/* PASSWORD */}
            <div className="mb-7">
                <Password
                    label="Mot de passe"
                    id="password"
                    placeholder=""
                    register={register("password", {
                        validate: (value) => {
                            // if (value.length < 2) return true; // no error before 2 letters

                            // REGEX: min 6 chars, 1 number, 1 capital letter
                            const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
                            if (!regex.test(value)) {
                                return "Min 6 chars, include number & capital letter";
                            }

                            if (
                                firstNameValue &&
                                value.toLowerCase().includes(firstNameValue.toLowerCase())
                            ) {
                                return "Password must not contain your first name";
                            }

                            if (
                                emailValue &&
                                value.toLowerCase().includes(emailValue.toLowerCase())
                            ) {
                                return "Password must not contain your email";
                            }

                            return true;
                        },
                    })}
                    error={errors.password?.message}
                    registerPage={true}
                    value={passwordValue}
                />
            </div>

            {/* NEWSLETTER CHECK */}
            <div className="flex items-center mt-6 gap-1">
                <input type="checkbox" {...register("yes")} />
                <p className="text-[15px] leading-[19px]">
                    I would like to receive exclusive offers
                </p>
            </div>

            {/* PRIVACY INFO */}
            <div className="mt-6">
                <p className="text-sm font-semibold leading-[17px]">
                    Your personal data will be used to assist you during your visit to the
                    website, manage access to your account, and for other reasons described
                    in our{" "}
                    <span className="text-[#1D98FE]">politique de confidentialité</span>.
                </p>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="mt-6 flex items-center justify-center">
                <FormButton type="submit" label={"sign up"} />
            </div>

            {/* SIGN IN LINK */}
            <div className="mt-6 font-semibold text-base leading-[24px] text-center">
                <Link href={"/login"} className="underline">
                    Sign in with another email address
                </Link>
            </div>
        </form>
    );
};

export default Register;
