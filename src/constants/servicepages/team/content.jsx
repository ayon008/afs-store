"use client";

import { ChevronRight } from "lucide-react";
import { ImageCard } from "./group";
import { ProfileCard } from "./team";

const GroupCard = ImageCard;
const TeamCard = ProfileCard;

const getTeamMemberImages = (department, index) => {
  // Define image ranges for each department to avoid duplicates
  const departmentRanges = {
    'Foils Production': { start: 1, end: 14 },
    'Board Production': { start: 15, end: 19 },
    'Design Office': { start: 20, end: 24 },
    'Logistics': { start: 25, end: 29 },
    'Trade': { start: 30, end: 31 },
    'Marketing': { start: 32, end: 37 },
    'Administration': { start: 38, end: 39 }
  };

  const range = departmentRanges[department];
  if (!range) return null;

  const imageIndex = range.start + index;
  if (imageIndex > range.end) return null;

  const imagePatterns = {
    'Foils Production': {
      default: `/images/team/members/dfault/default_${imageIndex}.webp`,
      hover: `/images/team/members/hover/hover_${imageIndex}.webp`
    },
    'Board Production': {
      default: `/images/team/members/dfault/default_${imageIndex}.webp`,
      hover: `/images/team/members/hover/hover_${imageIndex}.webp`
    },
    'Design Office': {
      default: `/images/team/members/dfault/default_${imageIndex}.webp`,
      hover: `/images/team/members/hover/hover_${imageIndex}.webp`
    },
    'Logistics': {
      default: `/images/team/members/dfault/default_${imageIndex}.webp`,
      hover: `/images/team/members/hover/hover_${imageIndex}.webp`
    },
    'Trade': {
      default: `/images/team/members/dfault/default_${imageIndex}.webp`,
      hover: `/images/team/members/hover/hover_${imageIndex}.webp`
    },
    'Marketing': {
      default: `/images/team/members/dfault/default_${imageIndex}.webp`,
      hover: `/images/team/members/hover/hover_${imageIndex}.webp`
    },
    'Administration': {
      default: `/images/team/members/dfault/default_${imageIndex}.webp`,
      hover: `/images/team/members/hover/hover_${imageIndex}.webp`
    }
  };

  return imagePatterns[department] || {
    default: `/images/team/members/Rectangle-3-1-1-${index + 1}_11zon-1097x1536.jpg.webp`,
    hover: `/images/team/members/Rectangle-3-1-1-${index + 2}_11zon-1097x1536.jpg.webp`
  };
};

const getGroupImages = (title) => {
  const groupImages = {
    'Foils Production': {
      default: '/images/team/group/Rectangle-10-1024x576.jpg.webp',
      hover: '/images/team/group/Rectangle-11-1-1024x576.jpg.webp'
    },
    'Board Production': {
      default: '/images/team/group/Rectangle-14-1024x576.jpg.webp',
      hover: '/images/team/group/Rectangle-15-1024x576.jpg.webp'
    },
    'Design Office': {
      default: '/images/team/group/Rectangle-16-1024x576.jpg.webp',
      hover: '/images/team/group/Rectangle-17-1024x576.jpg.webp'
    },
    'Logistics': {
      default: '/images/team/group/DSC1470-2_11zon-1024x615.jpg.webp',
      hover: '/images/team/group/DSC1481-2_11zon-1024x582.jpg.webp'
    },
    'Marketing': {
      default: '/images/team/group/DSC9878-1024x576.jpg.webp',
      hover: '/images/team/group/Image-de-OneDrive-1_11zon-1024x576.jpg.webp'
    },
    'Administration': {
      default: '/images/team/group/1A4A82C8-D73A-4826-B627-E39C082F1173-1024x577.jpg.webp',
      hover: '/images/team/group/Photo-DSC-9853-from-OneDrive_11zon-1-1_11zon-1024x576.jpg.webp'
    }
  };
  return groupImages[title] || {
    default: `https://placehold.co/1200x800/2F4F4F/FFFFFF?text=${title.replace(' ', '+')}`,
    hover: `https://placehold.co/1200x800/8B4513/FFFFFF?text=${title.replace(' ', '+')}+Team`
  };
};

const BoardContentNavigation = () => {
  const navItems = [
    { label: "Foils production", href: "#Foils" },
    { label: "Board production", href: "#Board" },
    { label: "Design office", href: "#Design" },
    { label: "LOGISTICS", href: "#Logistics" },
    { label: "Trade", href: "#Trade" },
    { label: "Marketing", href: "#Marketing" },
    { label: "Administration", href: "#Administration" },
  ];

  return (
    <div className="w-full bg-black text-white px-4 py-16 sm:px-8 lg:px-12 font-['Inter'] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="block group py-2 sm:py-3 transition-colors duration-200 uppercase tracking-wide text-gray-400 text-lg sm:text-xl font-semibold hover:text-white"
          >
            <div className="flex items-center">
              <ChevronRight
                size={18}
                className="mr-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300"
              />
              <span className="hover:underline hover:decoration-red-600 hover:underline-offset-4">
                {item.label}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const TeamsSection = ({ id, title, group, count }) => {
  const groupImageUrls = getGroupImages(title);

  return (
    <section
      id={id}
      className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-gray-900 font-['Inter']"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-16 uppercase">{title}</h2>

      {/* Group Image (if available) */}
      {group && (
        <div className="mb-24">
          <GroupCard
            title={title}
            defaultImageUrl={groupImageUrls.default}
            hoverImageUrl={groupImageUrls.hover}
          />
        </div>
      )}

      {/* Team Grid with fixed card sizing and proper spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 mr-20">
        {Array.from({ length: count }).map((_, i) => {
          const memberImages = getTeamMemberImages(title, i);
          if (!memberImages) return null;

          return (
            <div key={i} className="flex justify-center">
              <div className="w-[280px] shrink-0">
                <TeamCard
                  name={`${title} Specialist ${i + 1}`}
                  title={`${title} Team`}
                  defaultImage={memberImages.default}
                  hoverImage={memberImages.hover}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-white pt-12">
      {/* Foils Production — 1 group + 14 cards */}
      <TeamsSection id="Foils" title="Foils Production" group count={14} />

      {/* Board Production — 1 group + 4 + 1 row (total 5) */}
      <TeamsSection id="Board" title="Board Production" group count={5} />

      {/* Design Office — same as Board */}
      <TeamsSection id="Design" title="Design Office" group count={5} />

      {/* Logistics — same as Board */}
      <TeamsSection id="Logistics" title="Logistics" group count={5} />

      {/* Trade — no group, only 2 members */}
      <TeamsSection id="Trade" title="Trade" group={false} count={2} />

      {/* Marketing — 1 group + 6 cards total */}
      <TeamsSection id="Marketing" title="Marketing" group count={6} />

      {/* Administration — 1 group + 4 cards total */}
      <TeamsSection id="Administration" title="Administration" group count={4} />
    </main>
  );
}
