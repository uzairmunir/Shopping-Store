import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import CartItem from './CartItem';
import './cart.css';
import { Link } from 'react-router-dom';

const FilledCart = ({ cart, emptyCart, removeFromCart, updateQuantity }) => {
  return (
    <div className='filled-cart'>
      <div>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid key={item.id} md={4} sm={10}>
              <CartItem
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className='subtotal'>
        <Typography variant='subtitle1' color='textSecondary'>
          SubTotal : {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div className='subtotal-btn'>
          <Button
            color='secondary'
            type='button'
            variant='contained'
            size='large'
            onClick={() => emptyCart()}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to='/checkout'
            color='primary'
            type='button'
            variant='contained'
            size='large'
          >
            Check Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilledCart;
