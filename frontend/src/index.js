import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextProvider } from './UserContext'; // Importa el UserProvider

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider> {/* Envolver toda la aplicación en el ContextProvider */}
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
