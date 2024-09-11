import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from './UserContext'; // Importa el UserProvider

ReactDOM.render(
  <React.StrictMode>
    <UserProvider> {/* Envolver toda la aplicación en el UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
