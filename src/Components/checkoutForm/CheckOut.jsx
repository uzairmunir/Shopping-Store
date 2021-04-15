import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './checkout.css';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Confirmation from './Confirmation';
import { commerce } from './../../commerce/Commerce';

const CheckOut = ({ cart, order, error, onCaptureCheckout }) => {
  const steps = ['Shipping Details', 'Payment Method'];
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  //Generate CheckOut Token
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);
  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
  const backStep = () => setActiveStep((prevStep) => prevStep - 1);
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
      />
    );
  return (
    <>
      <div className='space' />
      <main>
        <Paper className='checkout-paper'>
          <Typography variant='h4' align='center'>
            CheckOut
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default CheckOut;
