import React from 'react';
import { Link } from 'react-router-dom';
import backArrow  from '../../assets/Back Arrow.png';
// import { IoArrowBack } from 'react-icons/io5';

const Sidebar = ({ isOpen, onClose }) => {
  const categories = ['Coffee', 'Non-Coffee', 'Snack', 'Main-Course'];

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
      />
      {/* Sidebar Content */}
      <aside 
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#8d63418e] backdrop-blur-lg text-white p-6 transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-start mb-8">
          <img src={backArrow} onClick={onClose} alt=" back arrow"  className='h-10 w-10 cursor-pointer'/>
        </div>
        <nav>
          <ul className="space-y-4 items-start">
            <li>
              <Link to="/" onClick={onClose} className="text-xl hover:text-[#A85B4D]">Home</Link>
            </li>
            {categories.map(category => (
              <li key={category}>
                <Link 
                  to={`/category/${category.toLowerCase()}`} 
                  onClick={onClose}
                  className="text-xl text-stone-50 hover:text-[#A85B4D]"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;