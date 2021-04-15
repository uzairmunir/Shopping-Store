import { Grid } from '@material-ui/core';
import React from 'react';
import Product from './product/Product';
import './Products.css';

const Products = ({ products, addToCart }) => {
  return (
    <div className='products'>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
