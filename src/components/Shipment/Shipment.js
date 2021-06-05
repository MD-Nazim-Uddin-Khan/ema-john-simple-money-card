import React, { useContext, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null)

  const onSubmit = data => {
    setShippingData(data)
  };

  const handlePaymentSuccess = paymentId => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      Shipment: shippingData,
      paymentId,
      orderTime: new Date()
    }

    fetch('https://stark-caverns-01518.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        processOrder();
        alert('your order placed successfully')
      })

    // console.log('form submitted', data)
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="row">
      <div style={{display: shippingData ? 'none' : 'block'}} className="col-md-6">
        <form className="ship-from" onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder="Your Name" />
          {errors.name && <span className="error">Name is required</span>}

          <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder="Your Email" />
          {errors.email && <span className="error">Email is required</span>}

          <input {...register("address", { required: true })} placeholder="Your Address" />
          {errors.address && <span className="error">Address is required</span>}

          <input {...register("phone", { required: true })} placeholder="Your Phone Number" />
          {errors.phone && <span className="error">Phone is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingData ? 'block' : 'none'}} className="col-md-6">
        <h2>please pay for me</h2>
        <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;