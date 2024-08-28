// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Importa UserProvider
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import Login from "./Login";
import Register from "./Register";
import User from "./pages/users/User";
import AcercaRopy from "./pages/AcercaRopy";
import Ubicacion from "./pages/Ubicacion";
import FQs from "./pages/FQs";
import LoginAdmin from './LoginAdmin';
import Admin from './pages/users/Admin';
import ProductoDetalle from './components/MainPage/ProductoDetalle';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { productItems } = Data;
  const { shopItems } = Sdata;

  const [CartItem, setCartItem] = React.useState([]);

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit) {
      setCartItem(CartItem.map((item) =>
        item.id === product.id
          ? { ...productExit, qty: productExit.qty + 1 }
          : item
      ));
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(CartItem.map((item) =>
        item.id === product.id
          ? { ...productExit, qty: productExit.qty - 1 }
          : item
      ));
    }
  };

  return (
    <UserProvider>
      <Router>
        <Header CartItem={CartItem} />
        <Routes>
          <Route path='/' element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />} />
          <Route path='/cart' element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
          <Route path='/login' element={isAuthenticated ? <Navigate to="/admin" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/loginAdmin" element={<LoginAdmin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user' element={<User />} />
          <Route path='/acercaRopy' element={<AcercaRopy />} />
          <Route path='/ubicacion' element={<Ubicacion />} />
          <Route path='/fqs' element={<FQs />} />
          <Route path='/producto/:id' element={<ProductoDetalle />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;