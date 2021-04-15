import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';
import { commerce } from './../../commerce/Commerce';
import { Link } from 'react-router-dom';

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingSubDivision, setShippingSubDivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  //Fetching Countries
  const fetchShippingCountries = async (checkoutTokenId) => {
    let { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
    console.log(countries);
  };
  //Converting Countries into array
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  //Fetching SubDivisions
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubDivisions(subdivisions);
    setShippingSubDivision(Object.keys(subdivisions)[0]);
  };
  //Converting SubDivisions into Array
  const subdivisions = Object.entries(shippingSubDivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );
  // Fetch Shipping Options
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country,
        region,
      }
    );
    console.log('Shipping', options);
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description}-(${sO.price.formatted_with_symbol})`,
  }));

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);
  useEffect(() => {
    if (shippingCountry) {
      return fetchSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);
  useEffect(() => {
    if (shippingSubDivision) {
      return fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubDivision
      );
    }
  }, [shippingSubDivision]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      zip: '',
      city: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      address: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      zip: Yup.number().required('Required'),
    }),
    onSubmit: (data) => {
      console.log('data', data);
      next({ ...data, shippingCountry, shippingSubDivision, shippingOption });
    },
  });
  return (
    <div>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <Grid container spacing={2}>
          <FormInput
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            label='First Name'
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
          <FormInput
            name='lastName'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            label='Last Name'
          />
          <FormInput
            name='address'
            value={formik.values.address}
            onChange={formik.handleChange}
            label='Address'
          />
          <FormInput
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            label='Email'
          />
          <FormInput
            name='city'
            value={formik.values.city}
            onChange={formik.handleChange}
            label='City'
          />
          <FormInput
            name='zip'
            value={formik.values.zip}
            onChange={formik.handleChange}
            label='Zip Code'
          />

          <Grid item sm={6} xs={12}>
            <InputLabel>Shipping Country</InputLabel>
            <Select
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
              fullWidth
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item sm={6} xs={12}>
            <InputLabel>Shipping Subdivision</InputLabel>
            <Select
              value={shippingSubDivision}
              onChange={(e) => setShippingSubDivision(e.target.value)}
              fullWidth
            >
              {subdivisions.map((subdivision) => (
                <MenuItem key={subdivision.id} value={subdivision.id}>
                  {subdivision.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item sm={6} xs={12}>
            <InputLabel>Shipping Option </InputLabel>
            <Select
              value={shippingOption}
              onChange={(e) => setShippingOption(e.target.value)}
              fullWidth
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '15px',
          }}
        >
          <Button type='button' variant='outlined' component={Link} to='/cart'>
            Back To Cart
          </Button>
          <Button type='submit' color='primary' variant='contained'>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
