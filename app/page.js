import Hero from "@/components/cart/home/Hero";
import Offers from "@/components/cart/home/Offers";
import PlansForYou from "@/components/cart/home/PlansForYou";
import Deals from "@/components/cart/home/Deals";
import Cuisines from "@/components/cart/home/Cuisines";
import PopularPicks from "@/components/cart/home/PopularPicks";
import Partners from "@/components/cart/home/Partners";
import BrowseByMeal from "@/components/cart/home/BrowseByMeal";
import YourPlan from "@/components/cart/home/YourPlan";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <main className="container">
        <Hero />
        <Offers />
        <PlansForYou />
        <Deals />
        <Cuisines />
        <PopularPicks />
        <Partners />
        <BrowseByMeal />
        <YourPlan />
      </main>
      <Footer />
    </>
  );
}
