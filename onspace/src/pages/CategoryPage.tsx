import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Grid, List, Filter, MapPin, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CategoryPage: React.FC = () => {
  const { slug } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');

  console.log('CategoryPage: Rendering for category:', slug);

  // Mock category data
  const categoryData = {
    cars: {
      name: 'Cars & Vehicles',
      subcategories: [
        { id: 'sedans', name: 'Sedans', count: 45 },
        { id: 'suvs', name: 'SUVs', count: 32 },
        { id: 'hatchbacks', name: 'Hatchbacks', count: 28 },
        { id: 'motorcycles', name: 'Motorcycles', count: 15 },
        { id: 'trucks', name: 'Trucks', count: 12 },
        { id: 'convertibles', name: 'Convertibles', count: 8 }
      ]
    },
    electronics: {
      name: 'Electronics',
      subcategories: [
        { id: 'phones', name: 'Mobile Phones', count: 67 },
        { id: 'laptops', name: 'Laptops', count: 43 },
        { id: 'gaming', name: 'Gaming', count: 29 },
        { id: 'cameras', name: 'Cameras', count: 21 },
        { id: 'tablets', name: 'Tablets', count: 18 },
        { id: 'accessories', name: 'Accessories', count: 35 }
      ]
    },
    'real-estate': {
      name: 'Real Estate',
      subcategories: [
        { id: 'apartments', name: 'Apartments', count: 89 },
        { id: 'houses', name: 'Houses', count: 56 },
        { id: 'commercial', name: 'Commercial', count: 23 },
        { id: 'land', name: 'Land', count: 12 },
        { id: 'vacation', name: 'Vacation Rentals', count: 34 },
        { id: 'rooms', name: 'Rooms', count: 67 }
      ]
    },
    fashion: {
      name: 'Fashion',
      subcategories: [
        { id: 'mens', name: "Men's Clothing", count: 78 },
        { id: 'womens', name: "Women's Clothing", count: 92 },
        { id: 'shoes', name: 'Shoes', count: 45 },
        { id: 'accessories', name: 'Accessories', count: 34 },
        { id: 'bags', name: 'Bags', count: 23 },
        { id: 'watches', name: 'Watches', count: 19 }
      ]
    }
  };

  const category = categoryData[slug as keyof typeof categoryData] || categoryData.cars;

  // Mock listings for the category
  const mockListings = [
    {
      id: '1',
      title: '2020 Toyota Camry - Excellent Condition',
      price: 22500,
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      subcategory: 'Sedans',
      timeAgo: '2 hours ago',
      isFeatured: true,
      views: 45
    },
    {
      id: '2',
      title: 'Honda Accord 2019 - Low Mileage',
      price: 19800,
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
      subcategory: 'Sedans',
      timeAgo: '5 hours ago',
      isFeatured: false,
      views: 23
    },
    {
      id: '3',
      title: 'BMW X5 2021 - Premium SUV',
      price: 45000,
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
      subcategory: 'SUVs',
      timeAgo: '1 day ago',
      isFeatured: true,
      views: 67
    },
    {
      id: '4',
      title: 'Ford F-150 2020 - Work Ready',
      price: 32000,
      location: 'Chicago, IL',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
      subcategory: 'Trucks',
      timeAgo: '6 hours ago',
      isFeatured: false,
      views: 34
    },
    {
      id: '5',
      title: 'Harley Davidson 2019',
      price: 15500,
      location: 'Austin, TX',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      subcategory: 'Motorcycles',
      timeAgo: '3 hours ago',
      isFeatured: false,
      views: 28
    },
    {
      id: '6',
      title: 'Tesla Model 3 2022',
      price: 38000,
      location: 'Seattle, WA',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
      subcategory: 'Sedans',
      timeAgo: '4 hours ago',
      isFeatured: true,
      views: 89
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredListings = selectedSubcategory
    ? mockListings.filter(listing => listing.subcategory === selectedSubcategory)
    : mockListings;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/listings" className="hover:text-blue-600">Listings</Link>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
            <p className="text-gray-600">
              {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''} available
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

        {/* Subcategories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Subcategory</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button
              variant={selectedSubcategory === '' ? 'default' : 'outline'}
              className="p-4 h-auto flex flex-col items-center"
              onClick={() => setSelectedSubcategory('')}
            >
              <span className="font-medium">All</span>
              <span className="text-xs text-gray-500 mt-1">
                {mockListings.length} ads
              </span>
            </Button>
            
            {category.subcategories.map((subcategory) => (
              <Button
                key={subcategory.id}
                variant={selectedSubcategory === subcategory.name ? 'default' : 'outline'}
                className="p-4 h-auto flex flex-col items-center"
                onClick={() => setSelectedSubcategory(subcategory.name)}
              >
                <span className="font-medium">{subcategory.name}</span>
                <span className="text-xs text-gray-500 mt-1">
                  {subcategory.count} ads
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filter */}
        {selectedSubcategory && (
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Showing results for:</span>
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">{selectedSubcategory}</span>
                <button
                  onClick={() => setSelectedSubcategory('')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
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
                          {listing.subcategory}
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
                            {listing.subcategory}
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-500 mb-6">
              Try selecting a different subcategory or browse all listings
            </p>
            <Button onClick={() => setSelectedSubcategory('')}>
              Show All {category.name}
            </Button>
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

export default CategoryPage;