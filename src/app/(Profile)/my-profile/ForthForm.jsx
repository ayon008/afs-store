"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormButton from '../../../Shared/Button/FormButton';
import Input from '../../../Shared/Input/input';
import { Pen } from "lucide-react";
import CountrySelect from '../../../Shared/Input/DropDown';
import { countriesList } from "../../../Shared/Input/countries";
import { updateShippingInfo } from "../../../funtions/auth";
import useAuth from "../../../hooks/use-auth";

const ForthForm = () => {

    const [show, setShow] = useState(false);
    const { user, loading, refreshUser } = useAuth();

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: {
            entreprise: "",
            country: "",
            postal: "",
            ville: "",
            adresse: ""
        },
        mode: "onChange"
    });

    // Reset form when user data is available
    useEffect(() => {
        if (user) {
            reset({
                entreprise: user.shipping?.company || "",
                country: user.shipping?.country || "",
                postal: user.shipping?.postcode || "",
                ville: user.shipping?.city || "",
                adresse: user.shipping?.address_1 || ""
            });
        }
    }, [user, reset]);

    const watchFields = watch();

    const onSubmit = async (data) => {
        try {
            const result = await updateShippingInfo(data);
            console.log(result, 'result');
            refreshUser();

        } catch (err) {
            console.error(err);
        }
    };

    // Show warning if field is empty (not required)
    const showErrorIfMissing = (fieldValue) => {
        return !fieldValue ? true : null;
    };


    return (
        <div>
            <div className="flex items-center justify-between pb-1 global-b-bottom">
                <h3 className="text-[28px] leading-[100%] font-semibold text-[#111]">Adresse de livraison</h3>
                <button className="flex items-center gap-1" type="button">
                    <Pen className="w-3 h-3" />
                    <span className="text-sm uppercase leading-[100%]">Modifier</span>
                </button>
            </div>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 2xl:grid-cols-3">
                    <div>
                        <Input
                            label="Entreprise"
                            type="text"
                            id="entreprise"
                            register={register("entreprise", { required: true })}
                            value={watchFields.entreprise}
                            registerPage={true}
                            error={showErrorIfMissing(watchFields.entreprise)}
                            show={show}
                        />
                    </div>
                    <div>
                        <CountrySelect
                            label="Country"
                            id="country"
                            register={register("country", { required: true })}
                            value={watchFields.country}
                            registerPage={true}
                            countries={countriesList}
                            show={show}
                        />
                    </div>
                    <div>
                        <Input
                            label="Code Postal"
                            type="number"
                            id="postal"
                            register={register("postal", { required: true })}
                            value={watchFields.postal}
                            registerPage={true}
                            error={showErrorIfMissing(watchFields.postal)}
                            show={show}
                        />
                    </div>
                    <div>
                        <Input
                            label="Ville"
                            type="text"
                            id="ville"
                            register={register("ville", { required: true })}
                            value={watchFields.ville}
                            registerPage={true}
                            error={showErrorIfMissing(watchFields.ville)}
                            show={show}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <Input
                            label="Adresse"
                            type="text"
                            id="adresse"
                            register={register("adresse", { required: true })}
                            value={watchFields.adresse}
                            registerPage={true}
                            error={showErrorIfMissing(watchFields.adresse)}
                            show={show}
                        />
                    </div>
                </div>
                {
                    show && (

                        <div className="mt-5">
                            <FormButton type="submit" label="ENREGISTRER LES MODIFICATIONS" />
                        </div>
                    )
                }
            </form>
        </div>
    );
};

export default ForthForm;
