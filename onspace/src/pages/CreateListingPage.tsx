import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  MapPin, 
  Tag, 
  DollarSign,
  FileText,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const CreateListingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    subcategory: '',
    city: '',
    area: '',
    description: '',
    condition: '',
    negotiable: false
  });

  console.log('CreateListingPage: Rendering for user:', user);

  const categories = {
    'cars': {
      name: 'Cars & Vehicles',
      subcategories: ['Sedans', 'SUVs', 'Hatchbacks', 'Motorcycles', 'Trucks', 'Convertibles']
    },
    'electronics': {
      name: 'Electronics',
      subcategories: ['Mobile Phones', 'Laptops', 'Gaming', 'Cameras', 'Tablets', 'Accessories']
    },
    'real-estate': {
      name: 'Real Estate',
      subcategories: ['Apartments', 'Houses', 'Commercial', 'Land', 'Vacation Rentals', 'Rooms']
    },
    'fashion': {
      name: 'Fashion',
      subcategories: ["Men's Clothing", "Women's Clothing", 'Shoes', 'Accessories', 'Bags', 'Watches']
    },
    'furniture': {
      name: 'Furniture',
      subcategories: ['Living Room', 'Bedroom', 'Dining Room', 'Office', 'Outdoor', 'Storage']
    },
    'sports': {
      name: 'Sports & Recreation',
      subcategories: ['Fitness', 'Cycling', 'Water Sports', 'Team Sports', 'Outdoor', 'Winter Sports']
    }
  };

  const cities = [
    'San Francisco, CA',
    'Los Angeles, CA',
    'New York, NY',
    'Chicago, IL',
    'Austin, TX',
    'Seattle, WA',
    'Miami, FL',
    'Denver, CO',
    'Portland, OR',
    'Boston, MA'
  ];

  const conditions = [
    'Brand New',
    'Like New',
    'Excellent',
    'Good',
    'Fair',
    'Poor'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(`File ${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`File ${file.name} is not a valid image.`);
        return false;
      }
      return true;
    });

    if (selectedImages.length + validFiles.length > 8) {
      toast.error('Maximum 8 images allowed per listing.');
      return;
    }

    setSelectedImages(prev => [...prev, ...validFiles]);
    console.log('CreateListingPage: Images selected:', validFiles.length);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    console.log('CreateListingPage: Image removed at index:', index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('CreateListingPage: Submitting form:', formData);

    // Validation
    if (!formData.title || !formData.price || !formData.category || !formData.description) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (selectedImages.length === 0) {
      toast.error('Please add at least one image.');
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast.error('Please enter a valid price.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Listing created successfully!');
      console.log('CreateListingPage: Listing created, redirecting to dashboard');
      navigate('/seller/dashboard');
    } catch (error) {
      console.error('CreateListingPage: Error creating listing:', error);
      toast.error('Failed to create listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories[formData.category as keyof typeof categories];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>
            <p className="text-gray-600 mt-1">Fill in the details below to create your listing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., iPhone 14 Pro Max 256GB"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="negotiable"
                      checked={formData.negotiable}
                      onChange={(e) => handleInputChange('negotiable', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="negotiable" className="ml-2 text-sm">
                      Price is negotiable
                    </Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => {
                      handleInputChange('category', value);
                      handleInputChange('subcategory', ''); // Reset subcategory
                    }}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categories).map(([key, category]) => (
                        <SelectItem key={key} value={key}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(value) => handleInputChange('subcategory', value)}
                    disabled={!formData.category}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory?.subcategories.map((subcategory) => (
                        <SelectItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => handleInputChange('city', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="area">Area/Neighborhood</Label>
                  <Input
                    id="area"
                    placeholder="e.g., Downtown, Mission District"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => handleInputChange('condition', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Images ({selectedImages.length}/8)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Upload Images</p>
                  <p className="text-gray-600">
                    Drag and drop images here, or click to select files
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Maximum 8 images, 5MB each. JPG, PNG formats supported.
                  </p>
                </label>
              </div>

              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Selected ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded">
                          Cover
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your item in detail. Include key features, condition, reason for selling, etc."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-2">
                Provide as much detail as possible to attract serious buyers.
              </p>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Link to="/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                'Create Listing'
              )}
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default CreateListingPage;