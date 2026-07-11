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
      <div className="relative">
        {/*
          Decorative layer that sits behind the (translucent) header so the
          hero's navy/white split background appears to run continuously
          from the very top of the page, through the header, and into the
          hero section below it — rather than starting only underneath it.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-16 bg-white md:h-36 md:bg-[linear-gradient(to_right,_#1e3a5f_50%,_#ffffff_50%)]"
        />
        <Header />
      </div>
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
