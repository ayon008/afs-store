"use client"
import DropDown from '@/components/DrowDown/DropDown';
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { getDealers } from "../../funtions/getDelaers"

const Dealers = () => {

    const [shop_name, setShopName] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    console.log('selectedId', selectedId);


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
            const data = await getDealers(selectedId);
            setData(data);
        }
        load();
    }, [selectedId]);


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
        id: i, lat: parseFloat(singleData?.acf?.latitude), lng: parseFloat(singleData?.acf?.longitude), category: singleData?.afs_dealers_type_names[0], shop_name: singleData?.acf?.shop_name
    }));


    const getMarkerSvg = (color, isActive = false) => {
        const transform = isActive ? "scale(1.08)" : "scale(1)";

        return `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g transform="${transform}">
    <rect x="11" y="8" width="10" height="11" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M27 13.4545C27 22.3636 16 30 16 30C16 30 5 22.3636 5 13.4545C5 10.4166 6.15893 7.5031 8.22183 5.35496C10.2847 3.20681 13.0826 2 16 2C18.9174 2 21.7153 3.20681 23.7782 5.35496C25.8411 7.5031 27 10.4166 27 13.4545ZM16 17.2727C18.025 17.2727 19.6667 15.5633 19.6667 13.4545C19.6667 11.3458 18.025 9.63636 16 9.63636C13.975 9.63636 12.3333 11.3458 12.3333 13.4545C12.3333 15.5633 13.975 17.2727 16 17.2727Z"
      fill="${color}" stroke="#111111" stroke-width="0.1" stroke-linecap="round"/>
  </g>
</svg>
`;
    };


    const getColorByCategory = (category) => {
        switch (category?.toLowerCase()) {
            case "schools":
                return "#1D98FF"; // blue
            case "dealers":
                return "#00C853"; // green
            case "company":
                return "#FF1744"; // red
            default:
                return "#FF1744"; // red
        }
    };



    return (
        <div>
            <div className='mb-10'>
                <DropDown selectedId={selectedId} setSelectedId={setSelectedId} />
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
                        minZoom: 4,
                        maxZoom: 8,
                        gestureHandling: "greedy"
                    }}
                >
                    {locations.map((loc) => {
                        const color = getColorByCategory(loc.category);
                        const isActive = shop_name === loc?.shop_name;
                        const svg = getMarkerSvg(color, isActive);

                        return (
                            <Marker
                                key={loc.id}
                                position={{ lat: loc.lat, lng: loc.lng }}
                                icon={{
                                    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
                                    scaledSize: new window.google.maps.Size(32, 32),
                                }}
                                zIndex={isActive ? 9999 : undefined}
                                animation={isActive ? window.google.maps.Animation.BOUNCE : undefined}
                                optimized={false}
                            />
                        );
                    })}
                </GoogleMap>
                <div className='z-20 top-8 left-4 absolute max-w-[385px] w-full bg-transparent h-[380px]'>
                    <div className='w-full bg-black py-[12.5px] px-5 rounded-[4px]'>
                        <h3 className='font-bold text-white text-[28px]'>Nombre de magasins:</h3>
                    </div>
                    <div className='overflow-y-scroll h-full popup-scroll-bar-1 cursor-pointer'>
                        {
                            data?.map((singleData, i) => {
                                const storeData = singleData?.acf;
                                const name = storeData?.shop_name;
                                const afs_dealers_type_names = singleData?.afs_dealers_type_names;


                                return (
                                    <div className={`bg-white pb-6 pt-5 px-5 rounded-[4px] my-1 w-[99%] transition-all duration-300 ${shop_name === name ? 'shadow-md scale-[1.01]' : ''}`} key={i} onMouseLeave={() => setShopName("")} onMouseEnter={() => setShopName(name)}>
                                        {afs_dealers_type_names?.map((dealerType, i) => {
                                            return (
                                                <div className='text-[#111111bf] text-sm border-[#111111bf] border w-fit px-1 rounded-[4px]' key={i}>
                                                    {dealerType}
                                                </div>
                                            )
                                        })}
                                        <p className='text-lg leading-[25px] font-bold mt-2'>{name}</p>
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