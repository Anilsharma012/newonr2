import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Flag, 
  MapPin, 
  Clock, 
  Eye, 
  Phone, 
  MessageCircle,
  User,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ListingDetailPage: React.FC = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  console.log('ListingDetailPage: Rendering for listing ID:', id);

  // Mock listing data
  const mockListing = {
    id,
    title: '2020 Toyota Camry - Excellent Condition',
    price: 22500,
    location: 'San Francisco, CA',
    category: 'Cars & Vehicles',
    subcategory: 'Sedans',
    description: `Beautiful 2020 Toyota Camry in excellent condition. This car has been well-maintained with regular service records. 

Features:
• Low mileage (35,000 miles)
• Clean title, no accidents
• Recent oil change and maintenance
• New tires installed 6 months ago
• Non-smoking vehicle
• All original documentation included

The car runs perfectly and is ready for its new owner. Serious inquiries only, please.`,
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
    ],
    seller: {
      id: 'seller1',
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 4.8,
      totalReviews: 23,
      memberSince: '2022',
      isVerified: true,
      responseRate: 95,
      responseTime: 'within 2 hours'
    },
    stats: {
      views: 245,
      saves: 18,
      shares: 5
    },
    postedDate: '2024-03-15',
    lastUpdated: '2024-03-16',
    isActive: true,
    isFeatured: true,
    tags: ['Low Mileage', 'No Accidents', 'Well Maintained']
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === mockListing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? mockListing.images.length - 1 : prev - 1
    );
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    console.log('ListingDetailPage: Toggled favorite status:', !isFavorited);
  };

  const handleContact = () => {
    console.log('ListingDetailPage: Contact seller clicked');
  };

  const handleShare = () => {
    console.log('ListingDetailPage: Share listing clicked');
    if (navigator.share) {
      navigator.share({
        title: mockListing.title,
        text: `Check out this ${mockListing.category} listing`,
        url: window.location.href
      });
    }
  };

  const handleReport = () => {
    console.log('ListingDetailPage: Report listing clicked');
  };

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
          <Link to={`/category/${mockListing.category.toLowerCase()}`} className="hover:text-blue-600">
            {mockListing.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{mockListing.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <Card className="mb-6 overflow-hidden">
              <div className="relative">
                <img
                  src={mockListing.images[currentImageIndex]}
                  alt={`${mockListing.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover"
                />
                
                {/* Navigation Buttons */}
                {mockListing.images.length > 1 && (
                  <>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {mockListing.isFeatured && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">FEATURED</Badge>
                  )}
                  <Badge variant="secondary">{mockListing.category}</Badge>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {mockListing.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {mockListing.images.length > 1 && (
                <div className="p-4 border-t">
                  <div className="flex space-x-2 overflow-x-auto">
                    {mockListing.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex ? 'border-blue-600' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Listing Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {mockListing.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {mockListing.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Posted {new Date(mockListing.postedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {mockListing.stats.views} views
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleFavorite}
                      className={isFavorited ? 'text-red-600 border-red-600' : ''}
                    >
                      <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-600' : ''}`} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleReport}>
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    {formatPrice(mockListing.price)}
                  </div>
                  
                  {mockListing.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mockListing.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <div className="text-gray-700 whitespace-pre-line">
                    {mockListing.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Seller Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3 mb-4">
                  <img
                    src={mockListing.seller.avatar}
                    alt={mockListing.seller.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{mockListing.seller.name}</h3>
                      {mockListing.seller.isVerified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{mockListing.seller.rating}</span>
                      <span className="text-sm text-gray-600">
                        ({mockListing.seller.totalReviews} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Member since {mockListing.seller.memberSince}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response rate:</span>
                    <span className="font-medium">{mockListing.seller.responseRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response time:</span>
                    <span className="font-medium">{mockListing.seller.responseTime}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleContact}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Show Phone Number
                  </Button>
                  <Link to={`/seller/${mockListing.seller.id}`}>
                    <Button variant="outline" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Safety Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Meet in a public place</p>
                <p>• Inspect the item before payment</p>
                <p>• Don't share personal information</p>
                <p>• Report suspicious activity</p>
                <Link to="/safety" className="text-blue-600 hover:text-blue-700 font-medium">
                  Read more safety tips →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Listings */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mock related listings */}
            {Array.from({ length: 4 }, (_, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <img
                  src={`https://images.unsplash.com/photo-${1621007947382 + index}?w=300&h=200&fit=crop`}
                  alt={`Similar listing ${index + 1}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    Similar Item {index + 1}
                  </h3>
                  <div className="text-lg font-bold text-blue-600 mb-2">
                    ${(20000 + index * 1000).toLocaleString()}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    San Francisco, CA
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListingDetailPage;