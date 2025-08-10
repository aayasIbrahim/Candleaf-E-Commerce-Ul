import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Admin from "./pages/Admin.jsx";
import AuthForm from "./pages/AuthForm.jsx";
import PrivteRoutes from "./routes/PrivteRoutes.jsx";

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
          <Route path="product/:id" element={<Cart />} />
          <Route path="product/popular/:id" element={<Cart />} />
          <Route path="product/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
