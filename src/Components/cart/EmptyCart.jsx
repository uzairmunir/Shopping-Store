import { Typography } from '@material-ui/core';
import React from 'react';

const EmptyCart = () => {
  return (
    <div>
      <Typography variant='h4' color='textSecondary'>
        Currently your cart is empty please add some items !
      </Typography>
    </div>
  );
};

export default EmptyCart;
