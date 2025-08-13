import React from 'react';

const MenuCard = ({ item, onClick }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className="block bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
    >
      <img 
        src={item.image || 'https://via.placeholder.com/300x200.png?text=Kopi+Kita'} 
        alt={item.name} 
        className="w-full h-32 object-cover" 
      />
      <div className="p-3">
        <h3 className="font-bold text-md text-gray-800 truncate">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-1">Rp {item.price.toLocaleString('id-ID')}</p>
      </div>
    </div>
  );
};

export default MenuCard;