import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/Navbar/NavBar';
import Products from './Components/products/Products';
import { commerce } from './commerce/Commerce';
import Cart from './Components/cart/Cart';
import CheckOut from './Components/checkoutForm/CheckOut';
import { AirlineSeatLegroomReducedRounded } from '@material-ui/icons';

const RouteConfig = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  //Fetch Products
  const fetchProducts = async () => {
    let { data } = await commerce.products.list();
    setProducts(data);
  };
  //Fetch Cart
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  // Handle Cart Products
  const handleCart = async (productId, quantity) => {
    let item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };
  // Handle Cart Item Quantity
  const handleCartQuantity = async (productId, quantity) => {
    let item = await commerce.cart.update(productId, { quantity });
    setCart(item.cart);
  };
  // Handle Remove from Cart
  const handleRemoveFromCart = async (productId) => {
    let item = await commerce.cart.remove(productId);
    setCart(item.cart);
  };
  // Handle Empty Cart
  const handleEmptyCart = async () => {
    let item = await commerce.cart.empty();
    setCart(item.cart);
  };
  // Refresh The cart after completing order
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  // handle capture checkout
  const handleCapturedCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      AirlineSeatLegroomReducedRounded(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);

  return (
    <div>
      <Router>
        <NavBar totalItems={cart.total_items} />
        <Routes>
          <Route
            exact
            path='/'
            element={<Products products={products} addToCart={handleCart} />}
          />
          <Route
            exact
            path='/cart'
            element={
              <Cart
                cart={cart}
                emptyCart={handleEmptyCart}
                removeFromCart={handleRemoveFromCart}
                updateQuantity={handleCartQuantity}
              />
            }
          />
          <Route
            exact
            path='/checkout'
            element={
              <CheckOut
                cart={cart}
                order={order}
                onCaptureCheckout={handleCapturedCheckout}
                error={errorMessage}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default RouteConfig;
