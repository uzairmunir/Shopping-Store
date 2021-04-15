import { Grid, TextField } from '@material-ui/core';
import { Field } from 'formik';
import React from 'react';

const FormInput = ({ name, label, value, onChange }) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        name={name}
        label={label}
        fullWidth
        value={value}
        onChange={onChange}
      />
    </Grid>
  );
};

export default FormInput;
