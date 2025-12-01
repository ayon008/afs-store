"use client"
import React, { useEffect, useState } from 'react';
import EventDropdown from "../../components/DrowDown/EventDropdown"
import { getAllEvents } from '../../funtions/getEvents';

const Events = () => {

    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await getAllEvents(selectedId);
            setData(data);
        }
        load();
    }, [selectedId]);

    return (
        <div>
            <div className='flex items-center justify-center lg:h-[500px] h-[420px] gap-6'>
                <div className='lg:w-1/3 h-full'>
                    <EventDropdown selectedId={selectedId} setSelectedId={setSelectedId} />
                </div>
                <div className='lg:w-2/3 h-full bg-green-500'></div>
            </div>
        </div>
    );
};

export default Events;