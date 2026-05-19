import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import CategorySection from "@/components/home/CategorySection";
import FlashSaleSection from "@/components/home/FlashSaleSection";
import UpgradeBanner from "@/components/home/UpgradeBanner";
import PromoBanners from "@/components/home/PromoBanners";
import CategoryPromoBanners from "@/components/home/CategoryPromoBanners";
import ProductSection from "@/components/home/ProductSection";
import BrandsSection from "@/components/home/BrandsSection";
import type { Product } from "@/data/mockData";

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero slider */}
      <HeroSection />

      {/* 2. Top Brands — right after hero */}
      <BrandsSection />

      {/* 3. Trust badges */}
      <TrustBadges />

      {/* 4. Category cards horizontal scroll */}
      <CategorySection />

      {/* 5. Flash Sale banner + Flash Deals horizontal scroll */}
      <FlashSaleSection />

      {/* 6. Upgrade Your Tech Game banner */}
      <UpgradeBanner />

      {/* 7. Promo banners: Get Now + Free Shipping */}
      <PromoBanners />

      {/* 8. Category promotional banners */}
      <CategoryPromoBanners />

      {/* 8. Recommended For You — horizontal scroll */}
      <ProductSection
        title="Recommended For You"
        viewAllHref="/shop"
        filter={(p: Product) => p.rating >= 4.7}
        limit={8}
        scroll={true}
      />

    </div>
  );
}
