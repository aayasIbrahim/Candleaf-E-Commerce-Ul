import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
