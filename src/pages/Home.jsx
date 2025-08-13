
import Bannar from "../components/Bannar";
import ProductList from "../components/ProductList";
import Hero from "../components/Hero";
import OurClient from "../components/OurClient";
import PopularProducts from "../components/product/PopularProducts";
// import Dashboard from "../components/Dashbord";


function Home() {
  return (
    <>
      <Bannar />
      <ProductList />
      <Hero />
      <OurClient />
      <PopularProducts />
      {/* <Dashboard/> */}
    </>
  );
}

export default Home;
