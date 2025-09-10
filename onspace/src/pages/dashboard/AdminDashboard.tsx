import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Users, 
  Package, 
  TrendingUp, 
  Flag, 
  Settings,
  BarChart3,
  Shield,
  MapPin,
  FileText,
  Bell,
  CreditCard,
  Star,
  Eye,
  MessageCircle,
  Calendar,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  console.log('AdminDashboard: Rendering for admin:', user);

  // Mock admin stats
  const adminStats = {
    totalUsers: 12547,
    totalListings: 8934,
    pendingApprovals: 45,
    totalReports: 12,
    revenue: 45320,
    conversionRate: 3.2
  };

  // Mock recent activity
  const recentActivity = [
    {
      id: '1',
      type: 'listing_created',
      user: 'John Doe',
      description: 'Created listing: 2020 Toyota Camry',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'user_registered',
      user: 'Sarah Smith',
      description: 'New user registered',
      timestamp: '3 hours ago'
    },
    {
      id: '3',
      type: 'report_submitted',
      user: 'Mike Johnson',
      description: 'Reported listing: Suspicious pricing',
      timestamp: '5 hours ago'
    },
    {
      id: '4',
      type: 'subscription_purchased',
      user: 'Emma Wilson',
      description: 'Purchased Premium subscription',
      timestamp: '1 day ago'
    }
  ];

  // Mock pending listings
  const pendingListings = [
    {
      id: '1',
      title: '2021 BMW X5 - Like New',
      seller: 'John Doe',
      price: 45000,
      category: 'Cars & Vehicles',
      submittedAt: '2024-03-15',
      status: 'pending'
    },
    {
      id: '2',
      title: 'iPhone 15 Pro Max 512GB',
      seller: 'Sarah Smith',
      price: 1200,
      category: 'Electronics',
      submittedAt: '2024-03-15',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Luxury Apartment Downtown',
      seller: 'Mike Wilson',
      price: 3500,
      category: 'Real Estate',
      submittedAt: '2024-03-14',
      status: 'pending'
    }
  ];

  // Mock reported listings
  const reportedListings = [
    {
      id: '1',
      title: 'Suspicious Electronics Deal',
      reporter: 'Jane Doe',
      reason: 'Suspicious pricing',
      status: 'under_review',
      reportedAt: '2024-03-15'
    },
    {
      id: '2',
      title: 'Fake Product Images',
      reporter: 'Bob Smith',
      reason: 'Misleading images',
      status: 'new',
      reportedAt: '2024-03-14'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'listing_created': return <Package className="h-4 w-4 text-green-600" />;
      case 'user_registered': return <Users className="h-4 w-4 text-blue-600" />;
      case 'report_submitted': return <Flag className="h-4 w-4 text-red-600" />;
      case 'subscription_purchased': return <CreditCard className="h-4 w-4 text-purple-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'new': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and manage your marketplace platform
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {adminStats.totalUsers.toLocaleString()}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Listings</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {adminStats.totalListings.toLocaleString()}
                      </p>
                    </div>
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                      <p className="text-2xl font-bold text-gray-900">{adminStats.pendingApprovals}</p>
                    </div>
                    <Shield className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Reports</p>
                      <p className="text-2xl font-bold text-gray-900">{adminStats.totalReports}</p>
                    </div>
                    <Flag className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${adminStats.revenue.toLocaleString()}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Conversion</p>
                      <p className="text-2xl font-bold text-gray-900">{adminStats.conversionRate}%</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-indigo-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Pending Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">by {activity.user} • {activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingListings.slice(0, 4).map((listing) => (
                      <div key={listing.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 line-clamp-1">{listing.title}</h4>
                          <p className="text-sm text-gray-600">
                            by {listing.seller} • ${listing.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="text-green-600">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Listing Management</h2>
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search listings..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Pending Listings Table */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Approval ({pendingListings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-sm font-medium text-gray-500 uppercase">Title</th>
                        <th className="pb-3 text-sm font-medium text-gray-500 uppercase">Seller</th>
                        <th className="pb-3 text-sm font-medium text-gray-500 uppercase">Category</th>
                        <th className="pb-3 text-sm font-medium text-gray-500 uppercase">Price</th>
                        <th className="pb-3 text-sm font-medium text-gray-500 uppercase">Status</th>
                        <th className="pb-3 text-sm font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pendingListings.map((listing) => (
                        <tr key={listing.id}>
                          <td className="py-4">
                            <div className="font-medium text-gray-900">{listing.title}</div>
                            <div className="text-sm text-gray-500">
                              Submitted {new Date(listing.submittedAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-4 text-gray-900">{listing.seller}</td>
                          <td className="py-4 text-gray-900">{listing.category}</td>
                          <td className="py-4 text-gray-900">${listing.price.toLocaleString()}</td>
                          <td className="py-4">
                            <Badge className={getStatusColor(listing.status)}>
                              {listing.status}
                            </Badge>
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600">
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">12,547</h3>
                  <p className="text-gray-600">Total Users</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
                  <p className="text-gray-600">Verified Sellers</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">234</h3>
                  <p className="text-gray-600">Premium Users</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Reports & Moderation</h2>
              <Button>Review All Reports</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reports ({reportedListings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportedListings.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{report.title}</h4>
                        <p className="text-sm text-gray-600">
                          Reported by {report.reporter} • {report.reason}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(report.reportedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.replace('_', ' ')}
                        </Badge>
                        <Button size="sm" variant="outline">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Analytics</h2>
              <p className="text-gray-600">Monitor platform performance and user engagement</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Revenue chart coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Activity chart coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Settings</h2>
              <p className="text-gray-600">Manage platform configuration and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Featured Ads</h4>
                      <p className="text-sm text-gray-600">Allow featured listings</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Auto Approval</h4>
                      <p className="text-sm text-gray-600">Automatically approve new listings</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-blue-600" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">User Registration</h4>
                      <p className="text-sm text-gray-600">Allow new user registration</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Listing Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Images per Listing
                    </label>
                    <Input type="number" defaultValue="8" className="w-24" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Listing Duration (days)
                    </label>
                    <Input type="number" defaultValue="30" className="w-24" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max File Size (MB)
                    </label>
                    <Input type="number" defaultValue="5" className="w-24" />
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

export default AdminDashboard;