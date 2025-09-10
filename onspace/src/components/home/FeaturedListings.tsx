import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useListings } from '@/hooks/useListings';

const FeaturedListings: React.FC = () => {
  const { listings, isLoading } = useListings({ is_featured: true });

  console.log('FeaturedListings: Rendering with listings:', listings.length);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Featured Listings
              </h2>
              <p className="text-xl text-gray-600">
                Hand-picked deals from verified sellers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (listings.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Listings
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              No featured listings available at the moment
            </p>
            <Link to="/listings">
              <Button>Browse All Listings</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Listings
            </h2>
            <p className="text-xl text-gray-600">
              Hand-picked deals from verified sellers
            </p>
          </div>
          <Link to="/listings?featured=true">
            <Button variant="outline" className="hidden sm:flex">
              View All Featured
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.slice(0, 4).map((listing: any) => (
            <Link
              key={listing.id}
              to={`/listings/${listing.id}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={listing.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}
                  alt={listing.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-medium rounded">
                    FEATURED
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-blue-600 font-medium uppercase">
                    {listing.categories?.name || 'General'}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {getTimeAgo(listing.created_at)}
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                  {listing.title}
                </h3>

                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {listing.cities?.name ? `${listing.cities.name}, ${listing.cities.state}` : 'Location not specified'}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(listing.price)}
                  </span>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {listing.profiles?.rating || '0.0'}
                    {listing.profiles?.is_verified && (
                      <span className="ml-1 text-green-600">✓</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link to="/listings?featured=true">
            <Button variant="outline">View All Featured</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;