import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import React from 'react';
import './cartitem.css';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <>
      <Card className='cart-card'>
        <CardActionArea>
          <img
            className='cart-products-img'
            src={item.media.source}
            title={item.name}
          />
          <CardContent className='cart-card-content'>
            <Typography
              gutterBottom
              variant='h5'
              color='textSecondary'
              component='h2'
            >
              {item.name}
            </Typography>
            <Typography variant='body2' component='h2'>
              {item.price.formatted_with_symbol}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className='cart-card-actions'>
          <div>
            <Button
              className='plus'
              size='small'
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </Button>
            {item.quantity}
            <Button
              className='minus'
              size='small'
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              -
            </Button>
          </div>
          <Button
            color='secondary'
            variant='contained'
            type='button'
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CartItem;
