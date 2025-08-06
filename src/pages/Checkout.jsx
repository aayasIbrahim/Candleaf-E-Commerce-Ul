import { Link } from "react-router-dom";
import { increment, decrement } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleIncrement = (id) => {
    dispatch(increment(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrement(id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mt-10">
          <h2 className="font-semibold text-2xl md:text-3xl mb-2">
            Your Cart Items
          </h2>
          <Link
            to="/"
            className="text-green-600 underline hover:text-red-500 text-sm"
          >
            Back to shopping
          </Link>
        </div>

        {/* Table Head */}
        <div className="hidden md:grid grid-cols-6 gap-4 text-gray-700 font-semibold text-left py-4 border-b mt-12">
          <p className="col-span-2">Product</p>
          <p className="col-span-1">Price</p>
          <p className="col-span-1 text-center">Quantity</p>
          <p className="col-span-1 text-right">Subtotal</p>
          <p className="col-span-1 text-right me-5">Action</p>
        </div>

        {/* Loop through Cart Items */}
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center py-6 border-none md:border-b mb-4"
          >
            {/* Image & Title */}
            <div className="col-span-2 flex items-center gap-4">
              <img
                src={item.img}
                alt={item.title}
                className="w-[93.54px] h-[76px] md:w-20 md:h-16 object-cover"
              />
              <p className="font-bold me-5">{item.title}</p>
            </div>

            {/* Price */}
            <div className="col-span-1">
              <p className="text-gray-800">Price: {item.price}$</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col items-center pe-2">
              <p className="text-[16px] font-medium">Quantity</p>
              <div className="w-[90px] h-[35px] mt-2 flex items-center justify-between px-3 border border-green-500 rounded">
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="text-green-500 text-lg font-bold"
                >
                  +
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleDecrement(item.id)}
                  className="text-green-500 text-lg font-bold"
                >
                  -
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="col-span-1 text-right">
              <p className="text-gray-800 font-medium">
                Sub-Total: {item.price * item.quantity}$
              </p>
            </div>

            {/* Remove */}
            <div className="col-span-1 text-right p-4">
              <Link
                to={`/`}
                className="text-red-500 underline hover:text-green-500 cursor-pointer"
              >
                Remove
              </Link>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="text-right mt-6 font-bold text-xl">
          Total: {totalAmount}$
        </div>

        {/* Checkout Button */}
        <button className="w-full md:w-1/2 md:mx-auto bg-green-700 hover:bg-green-800 text-white text-lg py-3 rounded-lg flex justify-center items-center gap-3 transition my-6">
          <span>Check Out</span>
        </button>
      </div>
    </section>
  );
}

export default Checkout;
