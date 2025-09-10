import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Smartphone, 
  Home, 
  Shirt, 
  Briefcase, 
  GraduationCap,
  Gamepad2,
  Heart,
  Baby,
  Wrench,
  PawPrint,
  HomeIcon
} from 'lucide-react';
import { useCategories, useListings } from '@/hooks/useListings';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Car': Car,
  'Smartphone': Smartphone,
  'Home': Home,
  'HomeIcon': HomeIcon,
  'Shirt': Shirt,
  'Briefcase': Briefcase,
  'GraduationCap': GraduationCap,
  'Gamepad2': Gamepad2,
  'Heart': Heart,
  'Baby': Baby,
  'Wrench': Wrench,
  'PawPrint': PawPrint,
};

const CategoriesGrid: React.FC = () => {
  const { data: categories = [], isLoading } = useCategories();
  const { listings } = useListings();

  console.log('CategoriesGrid: Rendering with categories:', categories.length);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find exactly what you're looking for in our organized categories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Count listings per category
  const getCategoryCount = (categoryId: string) => {
    return listings.filter(listing => listing.category_id === categoryId).length;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for in our organized categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon || 'Home'] || Home;
            const count = getCategoryCount(category.id);
            
            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <IconComponent className="h-6 w-6 text-blue-600 group-hover:text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base group-hover:text-blue-600">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {count} ads
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;