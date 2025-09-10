import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useListings } from '@/hooks/useListings';

const RecentListings: React.FC = () => {
  const { listings, isLoading } = useListings({ sort_by: 'newest' });

  console.log('RecentListings: Rendering with listings:', listings.length);

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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Recent Listings
              </h2>
              <p className="text-xl text-gray-600">
                Fresh items posted by our community
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="flex sm:block">
                  <div className="w-32 h-24 sm:w-full sm:h-48 bg-gray-200 flex-shrink-0"></div>
                  <div className="p-4 flex-1">
                    <div className="h-3 bg-gray-200 rounded mb-2 w-20"></div>
                    <div className="h-5 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const recentListings = listings.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Recent Listings
            </h2>
            <p className="text-xl text-gray-600">
              Fresh items posted by our community
            </p>
          </div>
          <Link to="/listings">
            <Button className="bg-blue-600 hover:bg-blue-700 hidden sm:flex">
              View All Listings
            </Button>
          </Link>
        </div>

        {recentListings.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-500 mb-6">Be the first to post a listing!</p>
            <Link to="/create-listing">
              <Button className="bg-blue-600 hover:bg-blue-700">Create Listing</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentListings.map((listing: any) => (
              <Link
                key={listing.id}
                to={`/listings/${listing.id}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden"
              >
                <div className="flex sm:block">
                  <img
                    src={listing.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop'}
                    alt={listing.title}
                    className="w-32 h-24 sm:w-full sm:h-48 object-cover group-hover:scale-105 transition-transform duration-200 flex-shrink-0"
                  />

                  <div className="p-4 flex-1">
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

                    <div className="text-lg font-bold text-blue-600">
                      {formatPrice(listing.price)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link to="/listings">
            <Button className="bg-blue-600 hover:bg-blue-700">
              View All Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentListings;