import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CardActionArea,
  CardActions,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import React from 'react';
import './product.css';

const Product = ({ product, addToCart }) => {
  return (
    <>
      <Card className='card'>
        <CardActionArea>
          <img
            className='products-img'
            src={product.media.source}
            title={product.name}
          />
          <CardContent className='card-content'>
            <Typography
              gutterBottom
              variant='h5'
              color='textSecondary'
              component='h2'
            >
              {product.name}
            </Typography>
            <Typography variant='body2' component='h2'>
              {product.price.formatted_with_symbol}
            </Typography>
          </CardContent>
          <Typography
            dangerouslySetInnerHtml={{ __html: product.description }}
            variant='body2'
          />
        </CardActionArea>
        <CardActions className='card-actions'>
          <IconButton onClick={() => addToCart(product.id, 1)}>
            <ShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
