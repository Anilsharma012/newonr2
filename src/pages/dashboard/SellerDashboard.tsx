import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Plus, 
  Package, 
  Eye, 
  Heart, 
  MessageCircle, 
  TrendingUp,
  Star,
  Clock,
  MapPin,
  Edit,
  Trash2,
  MoreHorizontal,
  DollarSign,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  console.log('SellerDashboard: Rendering for user:', user);

  // Mock seller stats
  const sellerStats = {
    totalListings: 12,
    activeListings: 8,
    totalViews: 1247,
    totalContacts: 34,
    rating: 4.7,
    reviews: 15,
    responseRate: 92,
    joinDate: '2023-03-15'
  };

  // Mock listings data
  const mockListings = [
    {
      id: '1',
      title: '2020 Toyota Camry - Excellent Condition',
      price: 22500,
      status: 'active',
      views: 245,
      contacts: 12,
      favorites: 18,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300&h=200&fit=crop',
      category: 'Cars & Vehicles',
      location: 'San Francisco, CA',
      createdAt: '2024-03-10',
      isFeatured: true
    },
    {
      id: '2',
      title: 'iPhone 14 Pro Max 256GB',
      price: 850,
      status: 'active',
      views: 123,
      contacts: 8,
      favorites: 12,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
      category: 'Electronics',
      location: 'San Francisco, CA',
      createdAt: '2024-03-08',
      isFeatured: false
    },
    {
      id: '3',
      title: 'Gaming PC Setup - RTX 4070',
      price: 1800,
      status: 'sold',
      views: 89,
      contacts: 6,
      favorites: 8,
      image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=300&h=200&fit=crop',
      category: 'Electronics',
      location: 'San Francisco, CA',
      createdAt: '2024-03-05',
      isFeatured: false
    },
    {
      id: '4',
      title: 'Designer Sofa Set',
      price: 1200,
      status: 'draft',
      views: 0,
      contacts: 0,
      favorites: 0,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop',
      category: 'Furniture',
      location: 'San Francisco, CA',
      createdAt: '2024-03-12',
      isFeatured: false
    }
  ];

  // Mock subscription packages
  const subscriptionPackages = [
    {
      id: '1',
      name: 'Basic',
      price: 0,
      duration: 'Free',
      features: ['Up to 3 listings', 'Basic support', '30 days validity'],
      current: true
    },
    {
      id: '2',
      name: 'Premium',
      price: 19.99,
      duration: 'Monthly',
      features: ['Up to 20 listings', 'Featured badge', 'Priority support', 'Analytics'],
      current: false
    },
    {
      id: '3',
      name: 'Business',
      price: 49.99,
      duration: 'Monthly',
      features: ['Unlimited listings', 'Top placement', 'Dedicated support', 'Advanced analytics', 'Verification badge'],
      current: false
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterListings = (status?: string) => {
    if (!status) return mockListings;
    return mockListings.filter(listing => listing.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Seller Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, {user?.name}! Manage your listings and grow your business.
            </p>
          </div>
          
          <Link to="/create-listing">
            <Button className="bg-blue-600 hover:bg-blue-700 mt-4 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Create Listing
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Listings</p>
                      <p className="text-2xl font-bold text-gray-900">{sellerStats.totalListings}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-gray-900">{sellerStats.totalViews.toLocaleString()}</p>
                    </div>
                    <Eye className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Contacts</p>
                      <p className="text-2xl font-bold text-gray-900">{sellerStats.totalContacts}</p>
                    </div>
                    <MessageCircle className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{sellerStats.rating}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockListings.slice(0, 3).map((listing) => (
                      <div key={listing.id} className="flex items-center space-x-4">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 line-clamp-1">{listing.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{formatPrice(listing.price)}</span>
                            <Badge className={getStatusColor(listing.status)}>
                              {listing.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div>{listing.views} views</div>
                          <div>{listing.contacts} contacts</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Response Rate</span>
                      <span className="font-semibold">{sellerStats.responseRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Rating</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold ml-1">{sellerStats.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Reviews</span>
                      <span className="font-semibold">{sellerStats.reviews}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-semibold">{new Date(sellerStats.joinDate).getFullYear()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            {/* Listing Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeTab === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('all')}
              >
                All ({mockListings.length})
              </Button>
              <Button
                variant={activeTab === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('active')}
              >
                Active ({filterListings('active').length})
              </Button>
              <Button
                variant={activeTab === 'sold' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('sold')}
              >
                Sold ({filterListings('sold').length})
              </Button>
              <Button
                variant={activeTab === 'draft' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('draft')}
              >
                Draft ({filterListings('draft').length})
              </Button>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 flex space-x-2">
                      <Badge className={getStatusColor(listing.status)}>
                        {listing.status}
                      </Badge>
                      {listing.isFeatured && (
                        <Badge className="bg-yellow-500 text-white">FEATURED</Badge>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-3 right-3"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {listing.title}
                    </h3>
                    
                    <div className="text-xl font-bold text-blue-600 mb-2">
                      {formatPrice(listing.price)}
                    </div>

                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {listing.location}
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {listing.views} views
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {listing.contacts} contacts
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {listing.favorites} saves
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Plans</h2>
              <p className="text-gray-600 mb-8">
                Choose the plan that best fits your selling needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPackages.map((pkg) => (
                <Card key={pkg.id} className={`relative ${pkg.current ? 'ring-2 ring-blue-600' : ''}`}>
                  {pkg.current && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                      Current Plan
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle>{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-blue-600">
                      {pkg.price === 0 ? 'Free' : `$${pkg.price}`}
                    </div>
                    <p className="text-gray-600">{pkg.duration}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${
                        pkg.current 
                          ? 'bg-gray-100 text-gray-600 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      disabled={pkg.current}
                    >
                      {pkg.current ? 'Current Plan' : 'Upgrade Now'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Analytics</h2>
              <p className="text-gray-600 mb-8">
                Track your listing performance and optimize for better results
              </p>
            </div>

            {/* Analytics placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Views Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Analytics chart coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockListings.slice(0, 3).map((listing, index) => (
                      <div key={listing.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                            #{index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 line-clamp-1">
                              {listing.title}
                            </h4>
                            <p className="text-sm text-gray-600">{listing.views} views</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{listing.contacts}</div>
                          <div className="text-sm text-gray-600">contacts</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default SellerDashboard;