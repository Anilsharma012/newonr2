import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Listing, Category, Subcategory, City, Area } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface ListingFilters {
  search?: string;
  category_id?: string;
  subcategory_id?: string;
  city_id?: string;
  area_id?: string;
  min_price?: number;
  max_price?: number;
  condition?: string;
  is_featured?: boolean;
  sort_by?: 'newest' | 'oldest' | 'price_low' | 'price_high';
}

interface CreateListingData {
  title: string;
  description?: string;
  price: number;
  category_id?: string;
  subcategory_id?: string;
  city_id?: string;
  area_id?: string;
  condition?: string;
  is_negotiable?: boolean;
  images: string[];
}

export const useListings = (filters: ListingFilters = {}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  console.log('useListings: Hook initialized with filters:', filters);

  // Fetch listings with filters
  const {
    data: listings = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['listings', filters],
    queryFn: async () => {
      console.log('useListings: Fetching listings with filters:', filters);
      
      let query = supabase
        .from('listings')
        .select(`
          *,
          profiles:seller_id (
            id,
            full_name,
            avatar_url,
            rating,
            is_verified
          ),
          categories:category_id (
            id,
            name,
            slug
          ),
          subcategories:subcategory_id (
            id,
            name,
            slug
          ),
          cities:city_id (
            id,
            name,
            slug,
            state
          ),
          areas:area_id (
            id,
            name,
            slug
          )
        `)
        .eq('status', 'active');

      // Apply filters
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters.category_id) {
        query = query.eq('category_id', filters.category_id);
      }

      if (filters.subcategory_id) {
        query = query.eq('subcategory_id', filters.subcategory_id);
      }

      if (filters.city_id) {
        query = query.eq('city_id', filters.city_id);
      }

      if (filters.area_id) {
        query = query.eq('area_id', filters.area_id);
      }

      if (filters.min_price !== undefined) {
        query = query.gte('price', filters.min_price);
      }

      if (filters.max_price !== undefined) {
        query = query.lte('price', filters.max_price);
      }

      if (filters.condition) {
        query = query.eq('condition', filters.condition);
      }

      if (filters.is_featured) {
        query = query.eq('is_featured', true);
      }

      // Apply sorting
      switch (filters.sort_by) {
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'price_low':
          query = query.order('price', { ascending: true });
          break;
        case 'price_high':
          query = query.order('price', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error('useListings: Error fetching listings:', error);
        throw error;
      }

      console.log('useListings: Fetched listings:', data?.length);
      return data as Listing[];
    },
  });

  // Fetch single listing by ID
  const useListing = (id: string) => {
    return useQuery({
      queryKey: ['listing', id],
      queryFn: async () => {
        console.log('useListings: Fetching single listing:', id);
        
        const { data, error } = await supabase
          .from('listings')
          .select(`
            *,
            profiles:seller_id (
              id,
              full_name,
              avatar_url,
              rating,
              total_reviews,
              is_verified
            ),
            categories:category_id (
              id,
              name,
              slug
            ),
            subcategories:subcategory_id (
              id,
              name,
              slug
            ),
            cities:city_id (
              id,
              name,
              slug,
              state
            ),
            areas:area_id (
              id,
              name,
              slug
            )
          `)
          .eq('id', id)
          .single();

        if (error) {
          console.error('useListings: Error fetching listing:', error);
          throw error;
        }

        console.log('useListings: Fetched listing:', data?.id);
        return data as Listing;
      },
      enabled: !!id,
    });
  };

  // Create listing mutation
  const createListingMutation = useMutation({
    mutationFn: async (listingData: CreateListingData) => {
      if (!user) {
        throw new Error('Must be logged in to create listing');
      }

      console.log('useListings: Creating listing:', listingData);

      // Generate slug from title
      const slug = listingData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      const { data, error } = await supabase
        .from('listings')
        .insert({
          ...listingData,
          seller_id: user.id,
          slug: `${slug}-${Date.now()}`,
          status: 'active',
        })
        .select()
        .single();

      if (error) {
        console.error('useListings: Error creating listing:', error);
        throw error;
      }

      console.log('useListings: Listing created:', data?.id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      toast.success('Listing created successfully!');
    },
    onError: (error: any) => {
      console.error('useListings: Create listing error:', error);
      toast.error('Failed to create listing. Please try again.');
    },
  });

  // Update listing mutation
  const updateListingMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Listing> }) => {
      console.log('useListings: Updating listing:', id, updates);

      const { data, error } = await supabase
        .from('listings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('useListings: Error updating listing:', error);
        throw error;
      }

      console.log('useListings: Listing updated:', data?.id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      toast.success('Listing updated successfully!');
    },
    onError: (error: any) => {
      console.error('useListings: Update listing error:', error);
      toast.error('Failed to update listing. Please try again.');
    },
  });

  // Delete listing mutation
  const deleteListingMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('useListings: Deleting listing:', id);

      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('useListings: Error deleting listing:', error);
        throw error;
      }

      console.log('useListings: Listing deleted:', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      toast.success('Listing deleted successfully!');
    },
    onError: (error: any) => {
      console.error('useListings: Delete listing error:', error);
      toast.error('Failed to delete listing. Please try again.');
    },
  });

  // Increment view count
  const incrementViewCount = async (listingId: string) => {
    try {
      console.log('useListings: Incrementing view count for:', listingId);
      
      const { error } = await supabase.rpc('increment_listing_views', {
        listing_id: listingId
      });

      if (error) {
        console.error('useListings: Error incrementing views:', error);
      }
    } catch (error) {
      console.error('useListings: Error in incrementViewCount:', error);
    }
  };

  return {
    listings,
    isLoading,
    error,
    refetch,
    useListing,
    createListing: createListingMutation.mutate,
    updateListing: updateListingMutation.mutate,
    deleteListing: deleteListingMutation.mutate,
    incrementViewCount,
    isCreating: createListingMutation.isPending,
    isUpdating: updateListingMutation.isPending,
    isDeleting: deleteListingMutation.isPending,
  };
};

// Hook for fetching categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('useCategories: Fetching categories');
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('useCategories: Error fetching categories:', error);
        throw error;
      }

      console.log('useCategories: Fetched categories:', data?.length);
      return data as Category[];
    },
  });
};

// Hook for fetching subcategories
export const useSubcategories = (categoryId?: string) => {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: async () => {
      console.log('useSubcategories: Fetching subcategories for category:', categoryId);
      
      let query = supabase
        .from('subcategories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('useSubcategories: Error fetching subcategories:', error);
        throw error;
      }

      console.log('useSubcategories: Fetched subcategories:', data?.length);
      return data as Subcategory[];
    },
    enabled: !categoryId || !!categoryId,
  });
};

// Hook for fetching cities
export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      console.log('useCities: Fetching cities');
      
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (error) {
        console.error('useCities: Error fetching cities:', error);
        throw error;
      }

      console.log('useCities: Fetched cities:', data?.length);
      return data as City[];
    },
  });
};

// Hook for fetching areas
export const useAreas = (cityId?: string) => {
  return useQuery({
    queryKey: ['areas', cityId],
    queryFn: async () => {
      console.log('useAreas: Fetching areas for city:', cityId);
      
      let query = supabase
        .from('areas')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (cityId) {
        query = query.eq('city_id', cityId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('useAreas: Error fetching areas:', error);
        throw error;
      }

      console.log('useAreas: Fetched areas:', data?.length);
      return data as Area[];
    },
    enabled: !cityId || !!cityId,
  });
};