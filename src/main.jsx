import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./App.css";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
