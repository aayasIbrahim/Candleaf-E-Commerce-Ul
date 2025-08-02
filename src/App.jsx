import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
// import About from "./pages/About.jsx";
// import Contact from "./pages/Contact.jsx";
import ProductDetails from "./components/product/ProductDetails.jsx";
import "./App.css";


const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
          <Route path="product/:id" element={<ProductDetails/>} />
          <Route path="product/popular/:id" element={<ProductDetails/>} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
