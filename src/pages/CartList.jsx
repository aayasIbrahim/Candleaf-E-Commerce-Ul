import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  increment,
  decrement,
  removeFromCart,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function CartList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleIncrement = (id) => dispatch(increment(id));
  const handleDecrement = (id) => dispatch(decrement(id));
  const handleRemoveFromCart = (id) => dispatch(removeFromCart(id));

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen   px-6 py-10 md:p-6">
      <div className="max-w-4xl mx-auto  rounded-lg shadow-lg ">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 px-4">
          <h2 className="font-bold mt-2 text-2xl md:text-3xl text-green-700 mb-2 md:mb-0">
            🛒 Your Cart
          </h2>
          <Link
            to="/"
            className="text-green-600 underline hover:text-green-800 text-sm"
          >
            ← Back to shopping
          </Link>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 && (
          <div className="text-center text-green-700 py-16">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="mx-auto w-24 mb-4 opacity-70"
            />
            <p className="text-lg font-semibold">Your cart is empty!</p>
          </div>
        )}

        {/* Cart Items */}
        <div className="space-y-6 px-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center gap-4 bg-gray-100 rounded-lg shadow p-4 "
            >
              {/* Image & Title */}
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-16 object-cover rounded-lg border"
                />
                <div>
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-gray-600 text-sm">Price: ${(item.price).toFixed(2)}</p>
                </div>
              </div>
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrement(item.id)}
                  className="bg-green-200 text-green-700 px-2 py-1 rounded hover:bg-green-300 font-bold text-lg"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="font-semibold text-lg px-2">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="bg-green-200 text-green-700 px-2 py-1 rounded hover:bg-green-300 font-bold text-lg"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              {/* Subtotal */}
              <div className="font-semibold text-green-700 flex-1 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              {/* Remove */}
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold ml-2"
                aria-label="Remove from cart"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-700">Total:</span>
              <span className="text-2xl font-bold text-green-700">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <button onClick={() => navigate("/checkout")}
              className="w-full bg-green-700 hover:bg-green-800 text-white text-lg py-3 rounded-lg font-semibold transition"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartList;