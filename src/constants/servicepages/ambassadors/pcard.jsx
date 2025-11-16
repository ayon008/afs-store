// components/AthleteCard.js
import styles from '../styles/AthleteCard.module.css';
import Image from 'next/image'; // Optimized image handling in Next.js
import InfoSection from './InfoSection';
import AthleteImage from './AthleteImage';

const athleteData = {
  name: "ROBERTO ALEN",
  country: "Spain",
  dateOfBirth: "1993-09-21",
  homeSpot: "Alloz",
  sport: "Wingfoil",
  imageUrl: "/images/roberto_alen.jpg" // Assuming the image is in the public folder
};

const AthleteCard = () => {
  return (
    <div className={styles.cardContainer}>
      {/* Close button icon */}
      <button className={styles.closeButton}>
        <span aria-hidden="true">&times;</span>
      </button>

      {/* Left side: Text Information */}
      <InfoSection data={athleteData} />

      {/* Right side: Athlete Image and background */}
      <AthleteImage imageUrl={athleteData.imageUrl} />
    </div>
  );
};

export default AthleteCard;