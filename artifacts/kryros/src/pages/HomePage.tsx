import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import CategorySection from "@/components/home/CategorySection";
import FlashSaleSection from "@/components/home/FlashSaleSection";
import PromoBanners from "@/components/home/PromoBanners";
import ProductSection from "@/components/home/ProductSection";
import BrandsSection from "@/components/home/BrandsSection";
import type { Product } from "@/data/mockData";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TrustBadges />
      <CategorySection />
      <FlashSaleSection />
      <PromoBanners />
      <ProductSection
        title="Products"
        tabs={[
          { label: "Flash Deals", filter: (p: Product) => p.discount > 15 },
          { label: "Trending", filter: (p: Product) => !!p.isTrending },
          { label: "Best Sellers", filter: (p: Product) => !!p.isBestSeller },
          { label: "New Arrivals", filter: (p: Product) => !!p.isNew },
        ]}
        limit={6}
      />
      <BrandsSection />
      <ProductSection title="Recommended For You" limit={5} />
      <PromoBanners variant="mega" />
      <ProductSection
        title="Recently Viewed"
        filter={(p: Product) => p.rating >= 4.8}
        limit={5}
      />
    </div>
  );
}
