import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ProductCategories from "@/components/home/ProductCategories";
import SpecialOffers from "@/components/home/SpecialOffers";
import OfferBanners1 from "@/components/home/OfferBanners1";
import NewProducts from "@/components/home/NewProducts";
import BrandGrid from "@/components/home/BrandGrid";
import OfferBanners2 from "@/components/home/OfferBanners2";
import WhyBuyFromUs from "@/components/home/WhyBuyFromUs";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <ProductCategories />
      <SpecialOffers />
      <OfferBanners1 />
      <NewProducts />
      <BrandGrid />
      <OfferBanners2 />
      <WhyBuyFromUs />
      <Footer />
    </>
  );
}
