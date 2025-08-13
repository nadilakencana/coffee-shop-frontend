import React from 'react';
// Anda mungkin perlu ikon dari react-icons
// import { RiRobot2Line } from 'react-icons/ri';

const AIButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed cursor-pointer bottom-4 z-50 ml-3 w-16 h-16 bg-[#bc7062] text-white rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
      aria-label="Open AI Assistant"
    >
      {/* <RiRobot2Line size={32} /> */}
      <span className="text-2xl">🤖</span>
    </div>
  );
};

export default AIButton;