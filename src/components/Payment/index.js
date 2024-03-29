import React, { useEffect, useState,  } from "react";

import Input from "./Input";
// import PaypalExpressBtn from "react-paypal-express-checkout";


import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import Row from "./Row";
import {scrollToTop} from "./utils";
import { selectCartTotal } from "../../lib/redux/selectors";
import Alert from "./Alert";
import { ADD_ORDER } from "../../lib/queries";
import { useMutation } from "@apollo/client";
import { nextDaydelivery } from "./utils";
import { resetCart } from "../../lib/redux/reducers/cart";

import { useNavigate } from 'react-router-dom';


// const onSuccess = (payment) => {
//   // Congratulation, it came here means everything's fine!
//       console.log("The payment was succeeded!", payment);
//       // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
// }

// const onCancel = (data) => {
//   // User pressed "cancel" or close Paypal's popup!
//   console.log('The payment was cancelled!', data);
//   // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
// }

// const onError = (err) => {
//   // The main Paypal's script cannot be loaded or somethings block the loading of that script!
//   console.log("Error!", err);
//   // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
//   // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
// }

// let env = 'sandbox'; // you can set here to 'production' for production
// let currency = 'EUR'; // or you can set this value from your props or state
// let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
// // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

// const client = {
//   sandbox:    'AUAKCal3CdB-W9xSFITf-ZRs3xokoYpVVvVzcMlfUAueaos974CjbZdVpiCvLn0eh9jcIB4iwW5w9zZg',
//   production: 'YOUR-PRODUCTION-APP-ID',
// }





//--------------------------------------------------

const STATUS = {
  PENDING: "pending",
  COMPLETE: "complete",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  FAILED: "error",
};



function Payment(props) {
  // console.log(props)
  // console.log(props)
  // console.log(props)
  // console.log(props)
  const dispatch=useDispatch()
  const items=useSelector(state=>state.cart.items)
  const {profile }= useSelector(state=>state.user)
  const total = useSelector(selectCartTotal)
  const [mutate] = useMutation(ADD_ORDER);
  const [valid, setValid] = useState(false);
  const [status, setStatus] = useState(STATUS.PENDING);
// const [show, setShow] = useState(false);
// const [ErrorMessage, setErrorMessage] = useState("");
// const [orderID, setOrderID] = useState(false);
const navigate = useNavigate();


const processPayment = (payment) => {//confirmer la transaction
  return new Promise((resolve)=>{
    const data ={
      cartDetails:items,
      payment:payment
    }
    console.log("The payment was succeeded!", payment)
    resolve(data)})
 };

 const addOrder=()=>{//ajouter la commande
  return new Promise(resolve=>{
    // console.log(profile)
    const newOrder = {
      id:new Date().getMilliseconds(),
      ownerId :profile.id,
      clientDetails:`${profile.family_name}.${profile.given_name}`,
      date:new Date(),
      pickupDate:nextDaydelivery(),
      total:total,
      items:items
    }
    mutate({variables:newOrder})
    console.log("order successfully conformed and added",newOrder)
    resolve()
  })
 }

 const confirmOrder=()=>{//confirmer loa commande 
  return new Promise(resolve=>{
    setStatus(STATUS.CONFIRMED)//reset cart panier
    dispatch(resetCart())
    // console.log("order successfully conformed and added")
    // resolve()
  })
 }

 const handleOnSubmit= async (e)=>{
  e.preventDefault()
  await addOrder()
  redirect()
  await confirmOrder()
  await scrollToTop()

}

function redirect() {
  console.log("navigate")
  setTimeout(()=>navigate('/'), 3000)
  // navigate('/home');

}

// creates a paypal order
const createOrder = (data, actions) => {
  return actions.order
    .create({
      purchase_units: [
        {
          description: "Uncia click & collect",
          amount: {
            currency_code: "USD",
            value: total,
          },
        },
      ],
      // not needed if a shipping address is actually needed
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    })
    .then((orderID) => {
      // setOrderID(orderID);
      return orderID;
    })
    .catch((err) => {
      console.log(err)
  });
};


const onApprove = (data, actions) => {
  return actions.order.capture().then(function (details) {
    const { payer } = details;
    // console.log("payer")
    // console.log(payer)
    processPayment(payer)
    setStatus(STATUS.COMPLETE);
    // console.log(data)
  });
};
const onCancel = (data) => {
  // console.log(data)
  setStatus(STATUS.CANCELLED);
  };


useEffect(() => {
  setValid(status===STATUS.COMPLETE)
}, [status]);


  return (
    <PayPalScriptProvider options={{ "client-id": "AUAKCal3CdB-W9xSFITf-ZRs3xokoYpVVvVzcMlfUAueaos974CjbZdVpiCvLn0eh9jcIB4iwW5w9zZg" }}>
           
       
    <section className="pt-5 pb-5">
      <div className="container">
        {/* success banner */}
        <Alert.Confirmed status={status=== STATUS.CONFIRMED}/>
        <Alert.Cancelled status={status=== STATUS.CANCELLED}/>
        <Alert.Error status={status=== STATUS.FAILED}/>
        <div className="py-5 text-center row justify-content-center">
          <div className="col-md-10">
            <h2>Checkout</h2>
          </div>
        </div>
        <div className="row justify-content-center rounded shadow pt-5 pb-5 bg-white ">
          <div className="col-md-4 offset-1 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
            {items?.map((item)=>(
              <Row key={item.id} {...item}/>
              
              ))}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total.toFixed(2) || "0.00"}</strong>
              </li>
            </ul>
            <form className="card p-2" >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6 order-md-1">
            <form
             onSubmit={handleOnSubmit}>
              <h4 className="mb-3">Payment</h4>
              <hr className="mb-4" />
              <div className="row">
                <Input
                  label="Name on the card"
                  className="col-md-6 mb-3"
                  id="cc-name"
                >
                  Name on card is required
                </Input>
                <Input
                  label="Credit card number"
                  className="col-md-6 mb-3"
                  id="cc-number"
                >
                  Credit card number is required
                </Input>
              </div>
              <div className="row">
                <Input
                  className="col-md-3 mb-3"
                  label="Expiration"
                  id="cc-expiration"
                >
                  Expiration date required
                </Input>
                <Input className="col-md-3 mb-3" label="CVV" id="cc-cvv">
                  Security code required
                </Input>
              </div>
              {/* <PaypalExpressBtn 
              env={env} 
              client={client} 
              currency={currency} 
              total={total} 
              onError={onError} 
              onSuccess={onSuccess} 
              onCancel={onCancel} 
              /> */}
              <PayPalButtons 
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onCancel={onCancel}
              />
              <hr className="mb-4" />
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                disabled={!valid}
              >
                <i className="far fa-credit-card"></i> Confirm
              </button>
              {/* <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                onClick={handleClick}
              >
                <i className="far fa-credit-card"></i> Confirm
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </section>
    </PayPalScriptProvider>
  );
}
export default Payment;
