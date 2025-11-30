"use client"
import DropDown from '@/components/DrowDown/DropDown';
import React, { useEffect, useState, useMemo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { getDealers } from "../../funtions/getDelaers"

const Dealers = () => {

    const mapStyle = [
        {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [{ color: "#444444" }]
        },
        {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }]
        },
        {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }]
        },
        {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }]
        },
        {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#46bcec" }, { visibility: "on" }]
        }
    ];

    const [data, setData] = useState([]);
    useEffect(() => {
        const load = async () => {
            const data = await getDealers();
            setData(data);
        }
        load();
    }, [])


    const center = {
        lat: 43.2902432365116,
        lng: 5.48532171164206
    };

    const containerStyle = {
        width: '100%',
        height: '500px'
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    });

    if (!isLoaded) return <p>Loading map...</p>;

    const locations = data?.map((singleData, i) => ({
        id: i, lat: parseFloat(singleData?.acf?.latitude), lng: parseFloat(singleData?.acf?.longitude)
    }));

    console.log(locations);



    return (
        <div>
            <div className='mb-10'>
                <DropDown />
            </div>
            {/* Map */}
            <div className='rounded-[4px] overflow-hidden relative z-10'>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={5}
                    options={{
                        styles: mapStyle,
                        mapTypeControl: false,
                    }}
                >
                    {locations.map((loc) => (
                        <Marker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} />
                    ))}
                </GoogleMap>
                <div className='z-20 top-8 left-4 absolute max-w-[385px] w-full bg-transparent h-[380px]'>
                    <div className='w-full bg-black py-[12.5px] px-5 rounded-[4px]'>
                        <h3 className='font-bold text-white text-[28px]'>Nombre de magasins:</h3>
                    </div>
                    <div className='overflow-y-scroll h-full popup-scroll-bar-1 cursor-pointer'>
                        {
                            data?.map((singleData, i) => {
                                const storeData = singleData?.acf;
                                const shop_name = storeData?.shop_name;
                                const afs_dealers_type_names = singleData?.afs_dealers_type_names;

                                return (
                                    <div className='bg-white pb-6 pt-5 px-5 rounded-[4px] my-1 w-[99%]' key={i}>
                                        {afs_dealers_type_names?.map((dealerType, i) => {
                                            return (
                                                <div className='text-[#111111bf] text-sm border-[#111111bf] border w-fit px-1 rounded-[4px]' key={i}>
                                                    {dealerType}
                                                </div>
                                            )
                                        })}
                                        <p className='text-lg leading-[25px] font-bold mt-2'>{shop_name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dealers;