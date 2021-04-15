import { Typography } from '@material-ui/core';
import React from 'react';
import './cart.css';
import EmptyCart from './EmptyCart';
import FilledCart from './FilledCart';

const Cart = ({ cart, emptyCart, removeFromCart, updateQuantity }) => {
  if (!cart.line_items) {
    return '...Loading';
  }
  return (
    <div className='cart-container'>
      <Typography variant='h2' className='h2'>
        Your Shopping Cart
      </Typography>
      {cart.line_items.length === 0 ? (
        <EmptyCart />
      ) : (
        <FilledCart
          cart={cart}
          emptyCart={emptyCart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      )}
    </div>
  );
};

export default Cart;
