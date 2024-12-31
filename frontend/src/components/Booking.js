import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Replace with your Stripe Publishable Key
const stripePromise = loadStripe("your-publishable-key");

const Booking = () => {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [amount] = useState(200); // Example amount in dollars
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!doctor || !date) {
      setMessage("Please select a doctor and date.");
      return;
    }

    try {
      // Call backend API to create payment intent
      const response = await fetch("http://localhost:5000/api/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount * 100, currency: "usd" }), // Stripe requires amount in cents
      });

      const { clientSecret } = await response.json();

      // Confirm payment using Stripe.js
      const stripe = useStripe();
      const elements = useElements();
      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        setMessage(`Payment failed: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        setMessage("Payment successful! Booking confirmed.");
      }
    } catch (error) {
      setMessage(`Error processing payment: ${error.message}`);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="container mt-4">
        <h2 className="text-primary mb-4">Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="doctor" className="form-label">
              Select Doctor
            </label>
            <select
              id="doctor"
              className="form-control"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value="">-- Choose a Doctor --</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. John">Dr. John</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              className="form-control"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="card">Credit/Debit Card</option>
            </select>
          </div>
          {paymentMethod === "card" && (
            <div className="mb-3">
              <label className="form-label">Card Details</label>
              <CardElement />
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Pay ${amount}
          </button>
        </form>
        {message && <p className="mt-3 text-danger">{message}</p>}
      </div>
    </Elements>
  );
};

export default Booking;
