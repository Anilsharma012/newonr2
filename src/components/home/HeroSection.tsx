import React, { useState } from 'react';
import { Search, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCities } from '@/hooks/useListings';

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const { data: cities = [] } = useCities();

  console.log('HeroSection: Rendering hero section');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('HeroSection: Searching for:', { searchQuery, location });
    
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (location) {
      // Find city by name
      const city = cities.find(c => 
        c.name.toLowerCase().includes(location.toLowerCase()) ||
        location.toLowerCase().includes(c.name.toLowerCase())
      );
      if (city) {
        params.append('city_id', city.id);
      } else {
        params.append('location', location);
      }
    }
    
    navigate(`/listings?${params.toString()}`);
  };

  const handleDetectLocation = () => {
    console.log('HeroSection: Detecting user location');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('HeroSection: Location detected:', position);
          // In a real app, you'd reverse geocode these coordinates
          // For now, we'll just set a default city
          setLocation('Current Location');
        },
        (error) => {
          console.error('HeroSection: Error detecting location:', error);
          setLocation('San Francisco, CA');
        }
      );
    } else {
      console.log('HeroSection: Geolocation not supported');
      setLocation('San Francisco, CA');
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill=%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Buy & Sell
            <span className="block text-yellow-400">Everything Locally</span>
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover amazing deals on cars, electronics, furniture, and more. 
            Your local marketplace for everything you need.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-2 sm:p-3 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full pl-12 pr-4 py-3 sm:py-4 text-gray-900 rounded-lg sm:rounded-none sm:rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Location Input */}
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-12 pr-12 py-3 sm:py-4 text-gray-900 rounded-lg sm:rounded-none border-0 sm:border-l border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
                    onClick={handleDetectLocation}
                  >
                    <Zap className="h-4 w-4" />
                  </Button>
                </div>

                {/* Search Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 sm:py-4 rounded-lg sm:rounded-none sm:rounded-r-lg"
                >
                  <Search className="h-5 w-5 sm:mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">10K+</div>
              <div className="text-sm text-blue-100">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">5K+</div>
              <div className="text-sm text-blue-100">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">50+</div>
              <div className="text-sm text-blue-100">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;