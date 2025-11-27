"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
gsap.registerPlugin(ScrollTrigger)

const TeamNav = () => {
    const teamRef = useRef(null);

    useGSAP(() => {
        if (!teamRef.current) return;
        gsap.to(teamRef.current, {
            scrollTrigger: {
                trigger: teamRef.current,
                start: "top 170px",
                end: "",
                pin: true
            }
        })
    })

    return (
        <div ref={teamRef}>
            <h3 className="text-xl uppercase font-semibold">Équipe AFS</h3>
            <ul className="mt-4 space-y-6 text-gray-400">
                <li className="uppercase font-semibold hover:text-black text-base leading-[130%] cursor-pointer">Production foils</li>
                <li className="uppercase font-semibold hover:text-black text-base leading-[130%] cursor-pointer">Bureau d’étude</li>
                <li className="uppercase font-semibold hover:text-black text-base leading-[130%] cursor-pointer">LOGISTIQUE</li>
                <li className="uppercase font-semibold hover:text-black text-base leading-[130%] cursor-pointer">Commerce</li>
                <li className="uppercase font-semibold hover:text-black text-base leading-[130%] cursor-pointer">MARKETING</li>
                <li className="uppercase font-semibold hover:text-black text-base leading-[130%] cursor-pointer">ADMINISTRATION</li>
            </ul>
        </div>
    );
};

export default TeamNav;