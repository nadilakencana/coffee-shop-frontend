import React from 'react';
import bannerImage from '../../assets/banner.png';

/**
 * Banner component displaying the main coffee shop branding
 * Uses banner image from assets
 */
const Banner = () => {
  return (
    <div className="mb-6 mt-[-80px]">
      <img 
        src={bannerImage} 
        alt="The World of Coffee Banner" 
        className="w-full h-80 object-cover"
      />
    </div>
  );
};

export default Banner;