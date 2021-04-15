import React from 'react';
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import { Button, Divider, Typography } from '@material-ui/core';

const PaymentForm = ({
  checkoutToken,
  backStep,
  shippingData,
  onCaptureCheckout,
  nextStep,
}) => {
  const stripePromise = loadStripe(
    'pk_test_51INbbSKubHRoepytSjAEuy6pUtCFHV5bwmgzj7VqMrGZfJOhWQdvkorwTxSCXOLnCSQCLJrqUw9dXx5K0x7RGfVB00NaYKuw4G'
  );

  const handleSubmit = async (event, stripe, elements) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'Primary',
          street: shippingData.address,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip: shippingData.zip,
          shipping_country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography gutterBottom variant='h6' style={{ margin: '15px 0px' }}>
        Payment Method
      </Typography>

      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='outlined' type='button' onClick={backStep}>
                  Back
                </Button>
                <Button variant='contained' type='submit' color='primary'>
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
