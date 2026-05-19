import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import CategorySection from "@/components/home/CategorySection";
import FlashSaleSection from "@/components/home/FlashSaleSection";
import UpgradeBanner from "@/components/home/UpgradeBanner";
import PromoBanners from "@/components/home/PromoBanners";
import ProductSection from "@/components/home/ProductSection";
import BrandsSection from "@/components/home/BrandsSection";
import type { Product } from "@/data/mockData";

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero slider */}
      <HeroSection />

      {/* 2. Trust badges */}
      <TrustBadges />

      {/* 3. Category icons horizontal scroll */}
      <CategorySection />

      {/* 4. Flash Sale banner + Flash Deals horizontal scroll */}
      <FlashSaleSection />

      {/* 5. Upgrade Your Tech Game banner */}
      <UpgradeBanner />

      {/* 6. Promo banners: Get Now + Free Shipping */}
      <PromoBanners />

      {/* 7. Top Brands You Love */}
      <BrandsSection />

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
