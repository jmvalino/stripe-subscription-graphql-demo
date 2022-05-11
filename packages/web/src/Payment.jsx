import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = ({ location }) => {
  const [clientSecret] = useState(location.state.clientSecret);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <Subscribe />
    </Elements>
  );
};

const Subscribe = () => {
  // Get the lookup key for the price from the previous page redirect.

  const [name, setName] = useState("Jenny Rosen");
  const [messages, _setMessages] = useState("");
  const [paymentIntent, setPaymentIntent] = useState();

  // helper for displaying status messages.
  const setMessage = (message) => {
    _setMessages(`${messages}\n\n${message}`);
  };

  // Initialize an instance of stripe.
  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return "";
  }

  // When the subscribe-form is submitted we do a few things:
  //
  //   1. Tokenize the payment method
  //   2. Create the subscription
  //   3. Handle any next actions like 3D Secure that are required for SCA.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    // const cardElement = elements.getElement(CardElement);

    // Use card Element to tokenize payment details
    // let { error, paymentIntent } = await stripe.confirmCardPayment(
    //   clientSecret,
    //   {
    //     payment_method: {
    //       card: cardElement,
    //       billing_details: {
    //         name: name,
    //       },
    //     },
    //   }
    // );

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://www.lophils.com/",
      },
    });

    if (error) {
      // show error and collect new card details.
      setMessage(error.message);
      return;
    }
    setPaymentIntent(paymentIntent);
  };

  if (paymentIntent && paymentIntent.status === "succeeded") {
    return <Redirect to={{ pathname: "/account" }} />;
  }

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl text-primary">Subscribe</h1>
        <p className="text-lg text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <ul className="list-outside space-y-3 mt-6 text-gray-500">
        <li>
          Try the successful test card: <span>4242424242424242</span>.
        </li>

        <li>
          Try the test card that requires SCA: <span>4000002800003155</span>.
        </li>

        <li>
          Use any <i>future</i> expiry date, CVC,5 digit postal code
        </li>
      </ul>

      <form onSubmit={handleSubmit} className="mt-8">
        {/* <CardElement /> */}
        <PaymentElement />
        <button className="bg-primary w-full text-white text-lg rounded-sm px-4 py-2 mt-3">
          Submit
        </button>
        <div>{messages}</div>
      </form>

      {/* <form onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <CardElement />

        <button>Subscribe</button>

        <div>{messages}</div>
      </form> */}
    </>
  );
};

export default withRouter(Payment);
