import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import AIButton from './components/ui/AIButton';
import AIModal from './components/features/AIModal';
import MenuDetailModal from './components/features/MenuDetailModal';
import './App.css'

/**
 * Main App component that serves as the layout wrapper for the coffee shop application
 * Manages global state for modals and provides context to child routes
 */
function App() {
  // State management for UI components
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAIModalOpen, setAIModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  /**
   * Handles menu card clicks to open detail modal
   * @param {Object} item - The menu item that was clicked
   */
  const handleCardClick = (item) => {
    setSelectedMenuItem(item);
  };
  
  /**
   * Closes the menu detail modal
   */
  const closeDetailModal = () => {
    setSelectedMenuItem(null);
  };

  return (
    <>
      {/* Main app container with mobile-first responsive design */}
      <div className="w-full  mx-auto bg-[#ffffff] sm:w-8/12 md:w-4/12 px-0  font-sans relative">
        {/* Header with navigation menu button and search */}
        <Header onMenuClick={() => setSidebarOpen(true)} onCardClick={handleCardClick} />
        
        {/* Sidebar navigation menu */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content area - renders HomePage or CategoryPage based on route */}
        <main>
          <Outlet context={{ onCardClick: handleCardClick }} />
        </main>

        {/* Floating AI assistant button */}
        <AIButton onClick={() => setAIModalOpen(true)} />

        {/* AI chat modal */}
        <AIModal isOpen={isAIModalOpen} onClose={() => setAIModalOpen(false)} />
        
        {/* Menu item detail modal */}
        <MenuDetailModal item={selectedMenuItem} onClose={closeDetailModal} />
      </div>
    </>
  )
}

export default App
