import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Search, Filter, MapPin, Heart, Clock, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ListingsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const searchQuery = searchParams.get('search') || '';
  const locationQuery = searchParams.get('location') || '';
  const categoryQuery = searchParams.get('category') || '';
  const featuredQuery = searchParams.get('featured') || '';

  console.log('ListingsPage: Rendering with params:', { searchQuery, locationQuery, categoryQuery, featuredQuery });

  // Mock listings data
  const mockListings = [
    {
      id: '1',
      title: '2020 Toyota Camry - Excellent Condition',
      price: 22500,
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      category: 'Cars & Vehicles',
      timeAgo: '2 hours ago',
      isFeatured: true,
      views: 45
    },
    {
      id: '2',
      title: 'iPhone 14 Pro Max 256GB - Like New',
      price: 850,
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      category: 'Electronics',
      timeAgo: '4 hours ago',
      isFeatured: false,
      views: 23
    },
    {
      id: '3',
      title: 'Modern 2BR Apartment for Rent',
      price: 2800,
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      category: 'Real Estate',
      timeAgo: '1 day ago',
      isFeatured: true,
      views: 67
    },
    {
      id: '4',
      title: 'Designer Sofa Set - Excellent Condition',
      price: 1200,
      location: 'Chicago, IL',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      category: 'Furniture',
      timeAgo: '6 hours ago',
      isFeatured: false,
      views: 12
    },
    {
      id: '5',
      title: 'Gaming PC Setup - RTX 4070',
      price: 1800,
      location: 'Austin, TX',
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop',
      category: 'Electronics',
      timeAgo: '1 hour ago',
      isFeatured: false,
      views: 34
    },
    {
      id: '6',
      title: 'Vintage Leather Jacket',
      price: 150,
      location: 'Portland, OR',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      category: 'Fashion',
      timeAgo: '2 hours ago',
      isFeatured: false,
      views: 8
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredListings = mockListings.filter(listing => {
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (locationQuery && !listing.location.toLowerCase().includes(locationQuery.toLowerCase())) {
      return false;
    }
    if (categoryQuery && listing.category.toLowerCase() !== categoryQuery.toLowerCase()) {
      return false;
    }
    if (featuredQuery === 'true' && !listing.isFeatured) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Listings'}
              </h1>
              <p className="text-gray-600">
                {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''} found
                {locationQuery && ` in ${locationQuery}`}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Categories</option>
                    <option value="cars">Cars & Vehicles</option>
                    <option value="electronics">Electronics</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="furniture">Furniture</option>
                    <option value="fashion">Fashion</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Locations</option>
                    <option value="san-francisco">San Francisco, CA</option>
                    <option value="los-angeles">Los Angeles, CA</option>
                    <option value="new-york">New York, NY</option>
                    <option value="chicago">Chicago, IL</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="Min price"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="Max price"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button variant="outline">Clear Filters</Button>
                <Button>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Listings Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredListings.map((listing) => (
            <Link key={listing.id} to={`/listings/${listing.id}`}>
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                {viewMode === 'grid' ? (
                  <>
                    <div className="relative">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {listing.isFeatured && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-medium rounded">
                            FEATURED
                          </span>
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-blue-600 font-medium uppercase">
                          {listing.category}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {listing.timeAgo}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                        {listing.title}
                      </h3>
                      
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {listing.location}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">
                          {formatPrice(listing.price)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {listing.views} views
                        </span>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <div className="relative">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-32 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                        />
                        {listing.isFeatured && (
                          <span className="absolute top-1 left-1 bg-yellow-500 text-white px-1 py-0.5 text-xs font-medium rounded">
                            FEATURED
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-blue-600 font-medium uppercase">
                            {listing.category}
                          </span>
                          <Button size="sm" variant="ghost">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                          {listing.title}
                        </h3>
                        
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {listing.location}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-blue-600">
                            {formatPrice(listing.price)}
                          </span>
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span>{listing.views} views</span>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {listing.timeAgo}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or browse all categories
            </p>
            <Link to="/">
              <Button>Browse All Categories</Button>
            </Link>
          </div>
        )}

        {/* Load More */}
        {filteredListings.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Listings
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ListingsPage;