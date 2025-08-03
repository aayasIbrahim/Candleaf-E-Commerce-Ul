import AllProducts from "../components/AllProducts";
import Bannar from "../components/Bannar";
import Hero from "../components/Hero";
import OurClient from "../components/OurClient";
import PopularProducts from "../components/product/PopularProducts";

function Home() {
  return (
    <>
      <Bannar />
      <AllProducts />
      <Hero />
      <OurClient />
      <PopularProducts />
    </>
  );
}

export default Home;
