import React from 'react';
import AdvancedBoardHero from '@/constants/servicepages/boardconstruction/coverimage';
import Content from '@/constants/servicepages/boardconstruction/content';
import Sidebar from '@/constants/servicepages/boardconstruction/sidebar';

export default function BoardConstruction() {
  return (
    <div className="min-h-screen bg-white">
      <AdvancedBoardHero />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}