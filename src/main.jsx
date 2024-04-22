import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-s7y248lo78mfufu2.us.auth0.com"
    clientId="qsMXvQlyLxytcai3FL58PiS1Syyy5lXd"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <PrimeReactProvider value={{ pt: Tailwind }}>
          <App />
        </PrimeReactProvider>
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
);
