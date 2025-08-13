import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";
import Cart from "./pages/CartList.jsx";
import AuthForm from "./pages/AuthForm.jsx";
import PrivateRoutes from "./routes/PrivteRoutes.jsx"; // spelling fix
import SingleProductDetails from "./pages/SingleProductDetails.jsx";
import Checkout from "./pages/Checkout.jsx";
import Contract from "./pages/Contract.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import ProductMangement from "./components/ProductMangement.jsx";
import GetContract from "./components/admin/Getcontract.jsx";
import UsersList from "./components/admin/UsersList.jsx";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contract" element={<Contract />} />
          <Route path="login" element={<AuthForm />} />
          <Route path="product/:id" element={<SingleProductDetails />} />
          <Route
            path="product/popular/:id"
            element={<SingleProductDetails />}
          />
          <Route path="product/cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />

          {/* Protected admin routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<ProductMangement />} />
              <Route path="user" element={<UsersList />} />
              <Route path="contractt" element={<GetContract />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
