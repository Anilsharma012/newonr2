import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Heart, 
  MessageCircle, 
  Package, 
  CreditCard, 
  Star,
  Plus,
  Eye,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  console.log('UserDashboard: Rendering user dashboard', { user });

  // Mock data for user stats
  const userStats = {
    activeListings: 3,
    totalViews: 127,
    favorites: 8,
    messages: 12
  };

  const recentActivity = [
    {
      id: '1',
      type: 'listing_viewed',
      title: 'Your iPhone 13 Pro listing was viewed',
      time: '2 hours ago',
      icon: Eye
    },
    {
      id: '2',
      type: 'message_received',
      title: 'New message about Toyota Camry',
      time: '5 hours ago',
      icon: MessageCircle
    },
    {
      id: '3',
      type: 'listing_favorited',
      title: 'Someone saved your MacBook listing',
      time: '1 day ago',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your listings, messages, and account settings
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/create-listing">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200 bg-blue-50">
              <CardContent className="p-6 text-center">
                <Plus className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-900">Create Listing</h3>
                <p className="text-sm text-blue-700 mt-1">Sell something new</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">{userStats.favorites}</h3>
              <p className="text-sm text-gray-600 mt-1">Saved Items</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">{userStats.messages}</h3>
              <p className="text-sm text-gray-600 mt-1">Messages</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">{userStats.totalViews}</h3>
              <p className="text-sm text-gray-600 mt-1">Total Views</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">View All Activity</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  to="/dashboard/listings"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Package className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium">My Listings</span>
                </Link>
                
                <Link
                  to="/dashboard/favorites"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium">Saved Items</span>
                </Link>
                
                <Link
                  to="/dashboard/messages"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium">Messages</span>
                </Link>
                
                <Link
                  to="/dashboard/subscriptions"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium">Subscriptions</span>
                </Link>
                
                <Link
                  to="/dashboard/reviews"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Star className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium">Reviews</span>
                </Link>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            <Card className="mt-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Upgrade to Premium</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Get more visibility with featured listings and priority support
                </p>
                <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;