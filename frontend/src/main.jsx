// import { StrictMode } from "react";
import { BrowserRouter} from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store";
import { Provider } from "react-redux";

// Create root and render the app inside StrictMode and Redux Provider
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>

  // {/* </StrictMode> */}
);
