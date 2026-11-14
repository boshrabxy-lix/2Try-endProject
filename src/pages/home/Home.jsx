import Hero from '../../components/hero/Hero';
import CategorySection from '../../components/categorySection/CategorySection';
import BestSellersSection from '../../components/bestSellersSection/BestSellersSection';
import InnerCircleSection from '../../components/innerCircleSection/InnerCircleSection';
import LimitedEditionSection from '../../components/limitedEditionSection/LimitedEditionSection';
import ProductsSection from '../../components/productSection/ProductSection';


export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <BestSellersSection />
      <InnerCircleSection/>
      <LimitedEditionSection/>
      <ProductsSection />


    </>
  );
}
