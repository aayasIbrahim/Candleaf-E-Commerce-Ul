import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../components/CheckOutForm";
const options = {
  mode: "payment",
  amount: 2500, // Example amount in cents
  currency: "usd",
  appearance: {
    /*...*/
  },
};
export default function Checkout() {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  console.log("Stripe Publishable Key:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  return (
    <div className="container">
      <Elements stripe={stripePromise} options={options}>
        <CheckOutForm />
      </Elements>
    </div>
  );
}
