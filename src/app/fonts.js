// src/app/fonts.js
import localFont from 'next/font/local';

export const allianceNo2 = localFont({
  src: [
    {
      path: '../../public/fonts/AllianceRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AllianceSemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AllianceBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-alliance-no2',
  display: 'swap',
});