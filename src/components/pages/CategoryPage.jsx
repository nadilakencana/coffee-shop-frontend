import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { getMenuByCategory } from '../../api/api';
import MenuCard from '../ui/MenuCard';

/**
 * CategoryPage component displays menu items filtered by category
 * Supports categories: coffee, non-coffee, snack, main-course
 */
const CategoryPage = () => {
  const { categoryName } = useParams();
  const { onCardClick } = useOutletContext();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for different categories as fallback
  const getMockData = (category) => {
    const mockMenus = {
      coffee: [
        { id: 1, name: 'Espresso', price: 25000, image: 'https://via.placeholder.com/300x200.png?text=Espresso', description: 'Rich and bold espresso', tags: ['coffee', 'hot'] },
        { id: 2, name: 'Cappuccino', price: 35000, image: 'https://via.placeholder.com/300x200.png?text=Cappuccino', description: 'Creamy cappuccino', tags: ['coffee', 'hot', 'milk'] },
        { id: 3, name: 'Latte', price: 40000, image: 'https://via.placeholder.com/300x200.png?text=Latte', description: 'Smooth latte', tags: ['coffee', 'hot', 'milk'] },
        { id: 4, name: 'Americano', price: 30000, image: 'https://via.placeholder.com/300x200.png?text=Americano', description: 'Classic black coffee', tags: ['coffee', 'hot'] }
      ],
      'non-coffee': [
        { id: 11, name: 'Hot Chocolate', price: 35000, image: 'https://via.placeholder.com/300x200.png?text=Hot+Chocolate', description: 'Rich hot chocolate', tags: ['non-coffee', 'hot', 'sweet'] },
        { id: 12, name: 'Green Tea', price: 25000, image: 'https://via.placeholder.com/300x200.png?text=Green+Tea', description: 'Fresh green tea', tags: ['non-coffee', 'hot', 'tea'] },
        { id: 13, name: 'Iced Tea', price: 20000, image: 'https://via.placeholder.com/300x200.png?text=Iced+Tea', description: 'Refreshing iced tea', tags: ['non-coffee', 'cold', 'tea'] },
        { id: 14, name: 'Smoothie', price: 45000, image: 'https://via.placeholder.com/300x200.png?text=Smoothie', description: 'Fresh fruit smoothie', tags: ['non-coffee', 'cold', 'fruit'] }
      ],
      snack: [
        { id: 21, name: 'Croissant', price: 20000, image: 'https://via.placeholder.com/300x200.png?text=Croissant', description: 'Buttery croissant', tags: ['pastry', 'breakfast'] },
        { id: 22, name: 'Muffin', price: 18000, image: 'https://via.placeholder.com/300x200.png?text=Muffin', description: 'Fresh muffin', tags: ['pastry', 'sweet'] },
        { id: 23, name: 'Cookie', price: 15000, image: 'https://via.placeholder.com/300x200.png?text=Cookie', description: 'Chocolate chip cookie', tags: ['pastry', 'sweet'] },
        { id: 24, name: 'Donut', price: 22000, image: 'https://via.placeholder.com/300x200.png?text=Donut', description: 'Glazed donut', tags: ['pastry', 'sweet'] }
      ],
      'main-course': [
        { id: 31, name: 'Grilled Sandwich', price: 45000, image: 'https://via.placeholder.com/300x200.png?text=Sandwich', description: 'Grilled chicken sandwich', tags: ['sandwich', 'lunch'] },
        { id: 32, name: 'Pasta', price: 55000, image: 'https://via.placeholder.com/300x200.png?text=Pasta', description: 'Creamy pasta', tags: ['pasta', 'lunch'] },
        { id: 33, name: 'Salad', price: 40000, image: 'https://via.placeholder.com/300x200.png?text=Salad', description: 'Fresh garden salad', tags: ['salad', 'healthy'] },
        { id: 34, name: 'Burger', price: 50000, image: 'https://via.placeholder.com/300x200.png?text=Burger', description: 'Beef burger with fries', tags: ['burger', 'lunch'] }
      ]
    };
    return mockMenus[category] || [];
  };

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMenuByCategory(categoryName);
        setMenu(Array.isArray(data) ? data : []);
      } catch (error) {
        console.warn(`API not available for category ${categoryName}, using mock data:`, error.message);
        // Use mock data instead of showing error
        setMenu(getMockData(categoryName));
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [categoryName]);
  
  // Format category name for display (e.g., "main-course" -> "Main Course")
  const pageTitle = categoryName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (loading) return <p className="text-center mt-8 text-gray-600">Loading {pageTitle.toLowerCase()}...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{pageTitle}</h1>
      <div className="grid grid-cols-2 gap-4">
        {menu.length > 0 ? (
          menu.map(item => (
            <MenuCard key={item.id} item={item} onClick={onCardClick} />
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500 mt-8">
            No items available in {pageTitle.toLowerCase()} category
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;