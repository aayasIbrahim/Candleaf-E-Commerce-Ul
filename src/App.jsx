import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./components/product/ProductDetails.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import "./App.css";


const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="addproduct" element={<AddProduct/>} />
          <Route path="product/:id" element={<ProductDetails/>} />
          <Route path="product/popular/:id" element={<ProductDetails/>} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
