import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom'; 
import { getHomePageData } from '../../api/api';
import MenuCard from '../ui/MenuCard';
import Banner from '../ui/Banner';

/**
 * HomePage component displays the main landing page with featured menu items
 * Shows best selling drinks and popular snacks sections
 */
const HomePage = () => {
  const { onCardClick } = useOutletContext(); 
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data as fallback when API is not available
  const mockData = {
    bestSellingDrinks: [
      { id: 1, name: 'Espresso', price: 25000, image: 'https://via.placeholder.com/300x200.png?text=Espresso', description: 'Rich and bold espresso', tags: ['coffee', 'hot'] },
      { id: 2, name: 'Cappuccino', price: 35000, image: 'https://via.placeholder.com/300x200.png?text=Cappuccino', description: 'Creamy cappuccino with foam art', tags: ['coffee', 'hot', 'milk'] },
      { id: 3, name: 'Latte', price: 40000, image: 'https://via.placeholder.com/300x200.png?text=Latte', description: 'Smooth latte with steamed milk', tags: ['coffee', 'hot', 'milk'] },
      { id: 4, name: 'Americano', price: 30000, image: 'https://via.placeholder.com/300x200.png?text=Americano', description: 'Classic black coffee', tags: ['coffee', 'hot'] }
    ],
    bestSellingSnacks: [
      { id: 5, name: 'Croissant', price: 20000, image: 'https://via.placeholder.com/300x200.png?text=Croissant', description: 'Buttery flaky croissant', tags: ['pastry', 'breakfast'] },
      { id: 6, name: 'Muffin', price: 18000, image: 'https://via.placeholder.com/300x200.png?text=Muffin', description: 'Fresh baked muffin', tags: ['pastry', 'sweet'] },
      { id: 7, name: 'Cookie', price: 15000, image: 'https://via.placeholder.com/300x200.png?text=Cookie', description: 'Chocolate chip cookie', tags: ['pastry', 'sweet'] },
      { id: 8, name: 'Donut', price: 22000, image: 'https://via.placeholder.com/300x200.png?text=Donut', description: 'Glazed donut', tags: ['pastry', 'sweet'] }
    ],
    bestSellingFood: [
      { id: 9, name: 'Grilled Sandwich', price: 45000, image: 'https://via.placeholder.com/300x200.png?text=Sandwich', description: 'Grilled chicken sandwich', tags: ['sandwich', 'lunch'] },
      { id: 10, name: 'Pasta', price: 55000, image: 'https://via.placeholder.com/300x200.png?text=Pasta', description: 'Creamy pasta', tags: ['pasta', 'lunch'] },
      { id: 11, name: 'Burger', price: 50000, image: 'https://via.placeholder.com/300x200.png?text=Burger', description: 'Beef burger with fries', tags: ['burger', 'lunch'] },
      { id: 12, name: 'Salad', price: 40000, image: 'https://via.placeholder.com/300x200.png?text=Salad', description: 'Fresh garden salad', tags: ['salad', 'healthy'] }
    ],
    bestSellingNonCoffee: [
      { id: 13, name: 'Hot Chocolate', price: 35000, image: 'https://via.placeholder.com/300x200.png?text=Hot+Chocolate', description: 'Rich hot chocolate', tags: ['non-coffee', 'hot'] },
      { id: 14, name: 'Green Tea', price: 25000, image: 'https://via.placeholder.com/300x200.png?text=Green+Tea', description: 'Fresh green tea', tags: ['non-coffee', 'hot'] },
      { id: 15, name: 'Iced Tea', price: 20000, image: 'https://via.placeholder.com/300x200.png?text=Iced+Tea', description: 'Refreshing iced tea', tags: ['non-coffee', 'cold'] },
      { id: 16, name: 'Smoothie', price: 45000, image: 'https://via.placeholder.com/300x200.png?text=Smoothie', description: 'Fresh fruit smoothie', tags: ['non-coffee', 'cold'] }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomePageData();
        console.log('API Response:', data);
        console.log('Is Array:', Array.isArray(data));
        console.log('Data type:', typeof data);
        
        // Handle different possible API response structures
        if (data && typeof data === 'object' && !Array.isArray(data) && 
            (data.bestSellingDrinks || data.bestSellingSnacks || data.bestSellingFood || data.bestSellingNonCoffee)) {
          console.log('Using object structure');
          setHomeData(data);
        } else if (Array.isArray(data)) {
          console.log('Using array structure');
          const coffe = data.filter(item => item.category === 'coffee');
          const nonCoffe = data.filter(item => item.category === 'non-coffee');
          const snacks = data.filter(item => item.category === 'snack');
          const mainCourse = data.filter(item => item.category === 'main-course');

          console.log('Filtered data:', { coffe, nonCoffe, snacks, mainCourse });

          setHomeData({ 
            bestSellingDrinks: coffe.slice(0, 4), 
            bestSellingSnacks: snacks.slice(0, 4), 
            bestSellingFood: mainCourse.slice(0, 4), 
            bestSellingNonCoffee: nonCoffe.slice(0, 4)
          });
        } else {
          console.log('Unknown data structure:', data);
        }
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-8 text-gray-600">Loading your coffee...</p>;

  return (
    <div className="space-y-1">
      {/* Banner Section */}
      <Banner />
      
      <div className="p-4 space-y-8">
        {/* Best Selling Drinks Section */}
        <section>
          <h2 className="text-md text-start font-bold text-gray-800 mb-4">Best Menu Coffee</h2>
          <div className="grid grid-cols-2 gap-4">
            {homeData?.bestSellingDrinks?.map(item => (
              <MenuCard key={item.id} item={item} onClick={onCardClick} />
            )) || (
              <p className="col-span-2 text-center text-gray-500">No drinks available</p>
            )}
          </div>
        </section>

        {/* bast food */}
        <section>
          <h2 className="text-md text-start font-bold text-gray-800 mb-4">Popular Main Course</h2>
          <div className="grid grid-cols-2 gap-4">
            {homeData?.bestSellingFood?.map(item => (
              <MenuCard key={item.id} item={item} onClick={onCardClick} />
            )) || (
              <p className="col-span-2 text-center text-gray-500">No drinks available</p>
            )}
          </div>
        </section>
      
      {/* Popular Snacks Section */}
      <section>
        <h2 className="text-md text-start font-bold text-gray-800 mb-4">Popular Snacks</h2>
        <div className="grid grid-cols-2 gap-4">
          {homeData?.bestSellingSnacks?.map(item => (
            <MenuCard key={item.id} item={item} onClick={onCardClick} />
          )) || (
            <p className="col-span-2 text-center text-gray-500">No snacks available</p>
          )}
        </div>
      </section>

      {/* Non Coffee Section */}
      <section>
        <h2 className="text-md text-start font-bold text-gray-800 mb-4">Non Coffee Drinks</h2>
        <div className="grid grid-cols-2 gap-4">
          {homeData?.bestSellingNonCoffee?.map(item => (
            <MenuCard key={item.id} item={item} onClick={onCardClick} />
          )) || (
            <p className="col-span-2 text-center text-gray-500">No non-coffee drinks available</p>
          )}
        </div>
      </section>
      </div>
    </div>
  );
};

export default HomePage;