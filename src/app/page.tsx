import { HeroBanner } from "@/components/home/hero-banner";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { NewArrivals } from "@/components/home/new-arrivals";
import { BrandLogos } from "@/components/home/brand-logos";
import { HistoryTimeline } from "@/components/home/history-timeline";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { FlashSale } from "@/components/home/flash-sale";
import { Testimonials } from "@/components/home/testimonials";
import { MarketingBanner } from "@/components/home/marketing-banner";
import { flashSale } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const saleItems = await flashSale();

  return (
    <>
      <HeroBanner />
      <BrandMarquee />
      <NewArrivals />
      <BrandLogos />
      <HistoryTimeline />
      <FeaturedCollections />
      <FlashSale items={saleItems} />
      <MarketingBanner />
      <Testimonials />
    </>
  );
}
