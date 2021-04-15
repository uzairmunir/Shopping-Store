import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ShoppingCart } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },

  title: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  image: {
    height: '50px',
  },
}));

export default function NavBar({ totalItems }) {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='textSecondary'>
        <Toolbar>
          <Typography
            variant='h6'
            className={classes.title}
            alignItems='center'
            component={Link}
            to='/'
          >
            React Store
          </Typography>
          {location.pathname === '/' ? (
            <IconButton>
              <Link to='/cart'>
                <Badge badgeContent={totalItems} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </Link>
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
