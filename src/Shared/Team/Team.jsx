import React from "react";
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
import { getTeamMember } from "../../funtions/getTeamMember";
import TeamCard from "../Card/TeamCard";


const Team = async () => {
  // Administration member-role=2485
  const administration = await getTeamMember(2135);
  // Marketing member-role=2122
  const marketing = await getTeamMember(2122);

  // Logistique member-role=2133
  const logistique = await getTeamMember(2133);

  // Burue member-role=2132
  const burue = await getTeamMember(2132);

  // production-plances = 2131
  const production_plances = await getTeamMember(2131);

  // production-foil = 2129
  const production_foil = await getTeamMember(2129);

  return (
    <div className="flex items-start justify-between">
      <div className="w-[18%]">
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
      <div className="w-[82%] mt-4">
        <div className="w-fit mx-auto flex items-center gap-3 mb-10">
          <p className="global-h1">40</p>
          <p className="text-[30px] font-bold leading-[110%] tracking-[-0.01em]">
            le nombre de <br />
            collaborateurs chez Foil And Co.
          </p>
        </div>

        {/* Production Foils */}
        <TeamImage
          hoverSrc={hoverImage}
          src={image}
          text={"Production foils"}
        />
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 gap-5 my-8">
          {production_foil?.map((member, i) => {
            return (
              <div key={i}>
                <TeamCard member={member} />
              </div>
            );
          })}
        </div>

        {/* Production Foil */}
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 gap-6"></div>
        <TeamImage
          src={image2}
          hoverSrc={hoverImage2}
          text={"Production planches"}
        />
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 gap-5 my-8">
          {production_plances?.map((member, i) => {
            return (
              <div key={i}>
                <TeamCard member={member} />
              </div>
            );
          })}
        </div>


        {/* Burue */}
        <TeamImage
          src={image3}
          hoverSrc={hoverImage3}
          text={"Bureau d’étude"}
        />
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 gap-5 my-8">
          {burue?.map((member, i) => {
            return (
              <div key={i}>
                <TeamCard member={member} />
              </div>
            );
          })}
        </div>
        <TeamImage src={image4} hoverSrc={hoverImage4} text={"LOGISTIQUE"} />
        {/*Logisitc member-role=2133  */}
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 gap-5 my-8">
          {logistique?.map((member, i) => {
            return (
              <div key={i}>
                <TeamCard member={member} />
              </div>
            );
          })}
        </div>
        {/* Marketing */}
        <TeamImage src={image5} hoverSrc={hoverImage5} text={"MARKETING"} />
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 gap-5 my-8">
          {marketing?.map((member, i) => {
            return (
              <div key={i}>
                <TeamCard member={member} />
              </div>
            );
          })}
        </div>

        <TeamImage
          src={image6}
          hoverSrc={hoverImage6}
          text={"ADMINISTRATION"}
        />
        {/* Administration member-role=2485 */}
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 gap-5 my-8">
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
  );
};

export default Team;
