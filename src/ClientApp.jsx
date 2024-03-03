import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// we are loading App, BrowserRouter - we are doing everything that has to be loaded in the **browser** here in the ClientApp. anything that all is gonna happen in browser and not gonna happen in server side renders.
