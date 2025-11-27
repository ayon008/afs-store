"use client"
import TeamImage from "./TeamImage";
import image from "../../assets/images/Team/Rectangle-10.jpg";
import hoverImage from "../../assets/images/Team/Rectangle-11-1.jpg.webp";
import image2 from "../../assets/images/Team/Image-de-OneDrive-1_11zon-scaled.jpg";
import hoverImage2 from "../../assets/images/Team/Photo-DSC-9853-from-OneDrive_11zon-1-1_11zon-scaled.jpg.webp";
import image3 from "../../assets/images/Team/DSC1470-2_11zon-scaled.jpg";
import hoverImage3 from "../../assets/images/Team/DSC1481-2_11zon-scaled.jpg.webp";
import image4 from "../../assets/images/Team/Rectangle-15.jpg";
import hoverImage4 from "../../assets/images/Team/Rectangle-14.jpg.webp";
import image5 from "../../assets/images/Team/DSC9878-scaled.jpg";
import hoverImage5 from "../../assets/images/Team/Rectangle-16.jpg.webp";
import image6 from "../../assets/images/Team/Rectangle-17.jpg";
import hoverImage6 from "../../assets/images/Team/Rectangle-18.jpg.webp";
import TeamCard from "../Card/TeamCard";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef, useState } from 'react';
gsap.registerPlugin(ScrollTrigger)

const Team = ({ data }) => {
  const { administration, marketing, burue, logistique, commerce, production_foil, production_plances } = data;
  const teamRef = useRef(null);
  const contentRef = useRef(null)
  const [activeId, setActiveId] = useState(null);

  useGSAP(() => {
    if (!teamRef.current && !contentRef.current) return;
    gsap.to(teamRef.current, {
      scrollTrigger: {
        trigger: teamRef.current,
        endTrigger: contentRef.current,
        start: "top 170px",
        end: "bottom bottom",
        pin: true
      }
    })
  })


  return (
    <div className="flex items-start justify-between relative h-full min-h-screen">
      <div className="lg:w-[18%] w-0 hidden lg:block z-30 h-fit">
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
      </div>
      <div className="lg:w-[82%] w-full mt-4" ref={contentRef}>
        <div className="flex items-center justify-center w-[90%] mx-auto">
          <div className="mb-10 flex items-center justify-center lg:gap-3 gap-[6px]">
            <p className="global-h1">40</p>
            <p className="lg:text-[30px] text-2xl font-bold leading-[110%] tracking-[-0.01em]">
              le nombre de <br />
              collaborateurs chez Foil And Co.
            </p>
          </div>
        </div>

        {/* Production Foils */}
        <div id="foil">
          <TeamImage
            hoverSrc={hoverImage}
            src={image}
            text={"Production foils"}
          />
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 lg:gap-5 gap-[10px] my-8">
            {production_foil?.map((member, i) => {
              return (
                <div key={i}>
                  <TeamCard member={member} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Production Plances */}
        <div id="plances">
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 lg:gap-6 gap-[10px]"></div>
          <TeamImage
            src={image2}
            hoverSrc={hoverImage2}
            text={"Production planches"}
          />
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 lg:gap-5 gap-[10px] my-8">
            {production_plances?.map((member, i) => {
              return (
                <div key={i}>
                  <TeamCard member={member} />
                </div>
              );
            })}
          </div>
        </div>

        <div id="burue">
          {/* Burue */}
          <TeamImage
            src={image3}
            hoverSrc={hoverImage3}
            text={"Bureau d’étude"}
          />
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 lg:gap-5 gap-[10px] my-8">
            {burue?.map((member, i) => {
              return (
                <div key={i}>
                  <TeamCard member={member} />
                </div>
              );
            })}
          </div>
        </div>
        <div id="logistic">
          <TeamImage src={image4} hoverSrc={hoverImage4} text={"LOGISTIQUE"} />
          {/*Logisitc member-role=2133  */}
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 lg:gap-5 gap-[10px] my-8">
            {logistique?.map((member, i) => {
              return (
                <div key={i}>
                  <TeamCard member={member} />
                </div>
              );
            })}
          </div>
        </div>

        <div id="commerce">
          {/* Commerce */}
          <p className="text-center global-h2">Commerce</p>
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 lg:gap-5 gap-[10px] my-8">
            {commerce?.map((member, i) => {
              return (
                <div key={i}>
                  <TeamCard member={member} />
                </div>
              );
            })}
          </div>
        </div>
        <div id="marketing">
          {/* Marketing */}
          <TeamImage src={image5} hoverSrc={hoverImage5} text={"MARKETING"} />
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 lg:gap-5 gap-[10px] my-8">
            {marketing?.map((member, i) => {
              return (
                <div key={i}>
                  <TeamCard member={member} />
                </div>
              );
            })}
          </div>
        </div>

        <div id="administration">
          <TeamImage
            src={image6}
            hoverSrc={hoverImage6}
            text={"ADMINISTRATION"}
          />
          {/* Administration member-role=2485 */}
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 lg:gap-5 gap-[10px] my-8">
            {administration?.map((member, i) => {
              return (
                <div key={i}>
                  <TeamCard member={member} />
                </div>
              );
            })} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
