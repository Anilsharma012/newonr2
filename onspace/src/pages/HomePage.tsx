import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoriesGrid from '@/components/home/CategoriesGrid';
import FeaturedListings from '@/components/home/FeaturedListings';
import RecentListings from '@/components/home/RecentListings';

const HomePage: React.FC = () => {
  console.log('HomePage: Rendering homepage');

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategoriesGrid />
        <FeaturedListings />
        <RecentListings />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;