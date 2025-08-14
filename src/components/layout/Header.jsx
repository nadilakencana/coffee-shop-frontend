import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMenu } from '../../api/api';
import logo from '../../assets/kopi kita.png';
import btnSidebar from '../../assets/btn menu.png';

const Header = ({ onMenuClick, onCardClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Mock search data as fallback
  const mockSearchData = [
    { id: 1, name: 'Espresso', price: 25000, category: 'coffee' },
    { id: 2, name: 'Cappuccino', price: 35000, category: 'coffee' },
    { id: 3, name: 'Latte', price: 40000, category: 'coffee' },
    { id: 4, name: 'Americano', price: 30000, category: 'coffee' },
    { id: 5, name: 'Hot Chocolate', price: 35000, category: 'non-coffee' },
    { id: 6, name: 'Croissant', price: 20000, category: 'snack' },
    { id: 7, name: 'Sandwich', price: 45000, category: 'main-course' }
  ];

  // Search function with debouncing
  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsLoading(true);
        try {
          const results = await searchMenu(searchQuery);
          setSearchResults(results);
        } catch (error) {
          // Use mock data as fallback
          const filtered = mockSearchData.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filtered);
        } finally {
          setIsLoading(false);
          setShowResults(true);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchResultClick = (item) => {
    setSearchQuery('');
    setShowResults(false);
    if (onCardClick) {
      onCardClick(item);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDF7F3]/32 backdrop-blur-lg p-2 sm:p-4 flex items-center justify-between">
      <div className="text-center flex-shrink-0">
        <img src={logo} alt="Kopi Kita" className="h-14 w-auto" />
      </div>
      <div className="w-full flex justify-between items-center gap-x-2 sm:gap-x-8">
        {/* Search Bar with Results */}
        <div className="relative flex-1 max-w-xs sm:max-w-none" ref={searchRef}>
          <input 
            type="text" 
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowResults(true)}
            className="w-full sm:w-70 pl-3 pr-2 py-2 text-sm sm:text-base rounded-full bg-white shadow-inner text-stone-600 focus:outline-none focus:ring-2 focus:ring-[#A85B4D]"
          />
          
          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border max-h-60 overflow-y-auto z-50">
              {isLoading ? (
                <div className="p-3 text-center text-gray-500">Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => handleSearchResultClick(item)}
                    className="p-2 sm:p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-gray-800 text-sm sm:text-base">{item.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500 capitalize">{item.category}</div>
                    </div>
                    <div className="text-[#A85B4D] font-semibold text-sm sm:text-base">
                      Rp {item.price?.toLocaleString('id-ID') || 'N/A'}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>
       
        <img 
          src={btnSidebar} 
          alt="btn menu" 
          onClick={onMenuClick} 
          className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer hover:opacity-80 flex-shrink-0" 
        />
      </div>
    </header>
  );
};

export default Header;