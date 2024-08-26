import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ReactDOM from 'react-dom';
import { UserProvider } from './UserContext'
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import Login from "./Login"
import Register from "./Register"
import User from "./pages/users/User"
import AcercaRopy from "./pages/AcercaRopy"
import Ubicacion from "./pages/Ubicacion";
import FQs from "./pages/FQs";

function App() {
  const { productItems } = Data
  const { shopItems } = Sdata

  const [CartItem, setCartItem] = useState([])

  const addToCart = (product) => {
    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id)

    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }
  ReactDOM.render(
    <UserProvider>
      <App />
    </UserProvider>,
    document.getElementById('root')
  );

  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Switch>
          <Route path='/' exact>
            <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />
          </Route>
          <Route path='/cart' exact>
            <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
          </Route>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/user" exact component={User} />
          <Route path="/acercaRopy" exact component={AcercaRopy} />
          <Route path="/ubicacion" exact component={Ubicacion} />
          <Route path="/fqs" exact component={FQs} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default App
