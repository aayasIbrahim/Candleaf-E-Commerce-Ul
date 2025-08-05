
import Bannar from "../components/Bannar";
import ProductList from "../components/ProductList";
import Hero from "../components/Hero";
import OurClient from "../components/OurClient";
import PopularProducts from "../components/product/PopularProducts";

function Home() {
  return (
    <>
      <Bannar />
      <ProductList />
      <Hero />
      <OurClient />
      <PopularProducts />
    </>
  );
}

export default Home;
