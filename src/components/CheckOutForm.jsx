import { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export default function CheckOutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalQuantity = cartItems.reduce((t, item) => t + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (t, item) => t + item.price * item.quantity,
    0
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!stripe || !elements) return;

    try {
      const res = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice * 100, currency: "usd" }),
      });

      const { clientSecret } = await res.json();

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setSuccess("Payment Successful 🎉");
      }
    } catch {
      setError("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="py-[100px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 text-white">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">Secure Checkout</h2>

        {/* Summary */}
        <div className="bg-white/20 rounded-lg p-4 mb-6">
          <div className="flex justify-between text-lg">
            <span>Items</span>
            <span>{totalQuantity}</span>
          </div>
          <div className="flex justify-between text-xl font-semibold mt-2">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#111",
                    "::placeholder": { color: "#888" },
                  },
                  invalid: { color: "#e53e3e" },
                },
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-indigo-500 hover:from-green-600 hover:to-indigo-700 font-semibold text-white transition-all duration-300 flex items-center justify-center"
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></span>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>

        {/* Messages */}
        {error && (
          <p className="mt-4 text-red-400 text-center font-medium">{error}</p>
        )}
        {success && (
          <div className="mt-6 flex flex-col items-center">
            <div className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center animate-bounce">
              ✅
            </div>
            <p className="text-green-400 mt-3 font-medium">{success}</p>
          </div>
        )}
      </div>
    </div>
  );
}
