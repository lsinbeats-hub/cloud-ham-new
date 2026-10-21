/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import BrandStatement from './components/BrandStatement';
import FeaturedMenu from './components/FeaturedMenu';
import FeaturedProduct from './components/FeaturedProduct';
import About from './components/About';
import BurgerShowcase from './components/BurgerShowcase';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F5F4F0] flex flex-col font-sans selection:bg-[#FFD429] selection:text-[#0A0B0D]">
      {/* Sticky Header with 3-zone contract */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 1. Cinematic Opening Hero */}
        <Hero />

        {/* 2. Short Brand Statement */}
        <BrandStatement />

        {/* 3. Visual Menu of Favorites */}
        <FeaturedMenu />

        {/* 4. Single Product Spotlight */}
        <FeaturedProduct />

        {/* 5. Brand Narrative & Ambiance */}
        <About />

        {/* 6. Hambúrguer Sem Fundo em PNG (Anatomia do Sabor) */}
        <BurgerShowcase />

        {/* 7. Location, Hours & Route */}
        <Location />

        {/* 8. Direct Contact & Social */}
        <Contact />
      </main>

      {/* 9. Cohesive Footer */}
      <Footer />
    </div>
  );
}
