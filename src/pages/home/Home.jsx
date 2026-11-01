import Hero from '../../components/hero/Hero';
import CategorySection from '../../components/categorySection/CategorySection';

import ProductSection from '../../components/productSection/productSection';
import BestSellersSection from '../../components/bestSellersSection/BestSellersSection';
import InnerCircleSection from '../../components/innerCircleSection/InnerCircleSection';
import LimitedEditionSection from '../../components/limitedEditionSection/LimitedEditionSection';



export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <BestSellersSection />
      <InnerCircleSection/>
      <LimitedEditionSection/>
      <ProductSection />
    </>
  );
}
