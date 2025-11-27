'use client';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import News from '../components/News';
import { Headline } from '../components/Headline';
import AboutVideoSection from '../constants/tour';
import BestSellers from '../constants/bestsellers';
import CategorySection from '../constants/shopcategory';
import CustomerServiceSwiper from '../constants/customerservice';
import MoreAboutAFS from '../constants/MoreAboutAFS';
import AFSNewsSection from '../constants/AFSNewsSection';
import FeatureBar from '../constants/FeatureBar';

export default function Home() {
  return (
    <div className="relative">
        <Hero />
        <AboutVideoSection />
        <BestSellers />
        <CategorySection />
        <CustomerServiceSwiper />
        <MoreAboutAFS />
        <AFSNewsSection />
        <FeatureBar />
    </div>
  );
}