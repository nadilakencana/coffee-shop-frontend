import React from 'react';

const MenuDetailModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-[#8d63418e]  flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white opacity-100 rounded-2xl shadow-xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
         <div className="relative">
            <img src={item.image || 'https://via.placeholder.com/400x250.png?text=Kopi+Kita'} alt={item.name} className="w-full h-48 object-cover rounded-t-2xl" />
            <button onClick={onClose} className="absolute top-2 right-2 bg-white rounded-full p-1 text-2xl">&times;</button>
         </div>
         <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
            <p className="text-lg font-semibold text-[#A85B4D] mt-2">Rp {item.price.toLocaleString('id-ID')}</p>
            <p className="text-gray-600 mt-4">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span key={tag} className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default MenuDetailModal;