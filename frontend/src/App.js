import React, { useState, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './UserContext'; // Importa UserProvider y UserContext
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import Login from "./Login";
import Register from "./Register";
import AcercaRopy from "./pages/AcercaRopy";
import Ubicacion from "./pages/Ubicacion";
import FQs from "./pages/FQs";
import Admin from './pages/users/Admin';
import ProductoDetalle from './components/MainPage/ProductoDetalle';
import NewUser from './components/new/New';
import UserProfile from './pages/users/UserProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { productItems } = Data;
  const { shopItems } = Sdata;

  const { contextUser } = useContext(UserContext); // Usa useContext para acceder a contextUser

  const [CartItem, setCartItem] = useState([]);

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
  const showHeaderAndFooter = (path) => {
    const noHeaderFooterPaths = ['/admin', '/loginAdmin'];
    return !noHeaderFooterPaths.includes(path);
  };

  return (
    <UserProvider>
      <Router>

        {showHeaderAndFooter(window.location.pathname) && <Header CartItem={CartItem} />}
        <Routes>
          <Route path='/' element={<Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />} />
          <Route path='/cart' element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />} />
          <Route path='/login' element={isAuthenticated ? <Navigate to="/admin" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/admin/*" element={isAuthenticated && contextUser?.Rol === 'Administrador' ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profileUser' element={<UserProfile />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path='/acercaRopy' element={<AcercaRopy />} />
          <Route path='/ubicacion' element={<Ubicacion />} />
          <Route path='/fqs' element={<FQs />} />
          <Route path='/producto/:id' element={<ProductoDetalle productItems={productItems} addToCart={addToCart} shopItems={shopItems}/>} />
        </Routes>
        {showHeaderAndFooter(window.location.pathname) && <Footer />}
      </Router>
    </UserProvider>
  );
}

export default App;