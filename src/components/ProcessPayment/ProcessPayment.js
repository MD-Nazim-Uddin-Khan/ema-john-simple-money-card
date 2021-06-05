import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51ItxzgLwvTXZ4Xn5vLNjoAVdbgyjhtJwhzRDS5FyO5fGpe6bV38p674B4mPsTLDIqMcpnWWHLq4lsv2zCwJFFNdE007Lr3ahxt');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            {/* <SplitCardForm/> */}
        </Elements>
    );
};

export default ProcessPayment;