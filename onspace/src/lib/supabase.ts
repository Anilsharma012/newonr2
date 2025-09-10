import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export type Profile = {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  role: 'user' | 'admin' | 'seller';
  is_verified: boolean;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type Subcategory = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type City = {
  id: string;
  name: string;
  slug: string;
  state?: string;
  country: string;
  is_active: boolean;
  created_at: string;
};

export type Area = {
  id: string;
  city_id: string;
  name: string;
  slug: string;
  pincode?: string;
  is_active: boolean;
  created_at: string;
};

export type Listing = {
  id: string;
  seller_id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  category_id?: string;
  subcategory_id?: string;
  city_id?: string;
  area_id?: string;
  images: string[];
  status: 'draft' | 'active' | 'sold' | 'expired' | 'rejected';
  condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  is_featured: boolean;
  is_urgent: boolean;
  is_negotiable: boolean;
  views: number;
  saves: number;
  contacts: number;
  expires_at?: string;
  featured_until?: string;
  created_at: string;
  updated_at: string;
};

export type Package = {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration_days: number;
  features: Record<string, any>;
  max_listings: number;
  is_featured: boolean;
  is_urgent: boolean;
  is_active: boolean;
  created_at: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  listing_id: string;
  created_at: string;
};

export type ChatThread = {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  last_message_at: string;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  thread_id: string;
  sender_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
};