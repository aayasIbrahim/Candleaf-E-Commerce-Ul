import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";
import Cart from "./pages/CartList.jsx";
import Admin from "./pages/Admin.jsx";
import AuthForm from "./pages/AuthForm.jsx";
import PrivteRoutes from "./routes/PrivteRoutes.jsx";
import SingleProductDetails from "./pages/SingleProductDetails.jsx";
import Checkout from "./pages/Checkout.jsx";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="admin"
            element={
              <PrivteRoutes>
                <Admin />
              </PrivteRoutes>
            }
          />
          <Route path="login" element={<AuthForm />} />
          <Route path="product/:id" element={<SingleProductDetails />} />
          <Route
            path="product/popular/:id"
            element={<SingleProductDetails />}
          />
          <Route path="product/cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
