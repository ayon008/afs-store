import React from "react";
import TeamImage from "../../Shared/Team/TeamImage";
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

const Team = () => {
  return (
    <div className="flex items-start justify-between">
      <div className="w-[18%]">Ayon</div>
      <div className="w-[82%]">
        <div className="w-fit mx-auto flex items-center gap-3 mb-10">
          <p className="global-h1">40</p>
          <p className="text-[30px] font-bold leading-[110%] tracking-[-0.01em]">
            le nombre de <br />
            collaborateurs chez Foil And Co.
          </p>
        </div>
        <TeamImage
          hoverSrc={hoverImage}
          src={image}
          text={"Production foils"}
        />
        {/* Production Foil */}
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 gap-6"></div>
        <TeamImage
          src={image2}
          hoverSrc={hoverImage2}
          text={"Production planches"}
        />
        <TeamImage
          src={image3}
          hoverSrc={hoverImage3}
          text={"Bureau d’étude"}
        />
        <TeamImage
          src={image4}
          hoverSrc={hoverImage4}
          text={"LOGISTIQUE"}
        />
        <TeamImage
          src={image5}
          hoverSrc={hoverImage5}
          text={"MARKETING"}
        />
        <TeamImage
          src={image6}
          hoverSrc={hoverImage6}
          text={"ADMINISTRATION"}
        />
      </div>
    </div>
  );
};

export default Team;
