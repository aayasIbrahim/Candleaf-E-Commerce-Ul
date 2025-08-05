import useProductId from "../hook/useProductId";
import { useParams } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { addToCart, increment, decrement } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Cart() {
  const { id } = useParams();
  const product = useProductId(id);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const productInCart = cartItems.find((item) => item.id == product?.id);

  const handleAddToCart = () => {
    if (!productInCart) {
      dispatch(addToCart(product));
    }
    //  navigate("/")// Redirect to Checkout page
  };

  const handleIncrement = () => {
    dispatch(increment(product?.id));
  };

  const handleDecrement = () => {
    dispatch(decrement(product?.id));
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-8">
        {/* Title */}
        <h2 className="text-2xl lg:text-4xl font-semibold text-center lg:text-left lg:ms-[90px] mb-6 ">
          {product?.title}
        </h2>

        {/* Desktop Grid */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={product?.img}
              alt={product?.title}
              className="bg-[#F7F8FA] rounded-lg shadow-md md:w-[400px] md:h-[300px] lg:mt-9"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            {/* Price and Quantity */}
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-green-600 text-2xl lg:text-3xl font-bold">
                {productInCart
                  ? `${Number(product?.price * productInCart?.quantity)}$`
                  : `${Number(product?.price)}$`}
                {/* ternary oparator korchi bcz initally NaN dakaitache ..databse theke string hisbe ashe number ta */}
              </h4>
              {productInCart && (
                <div className="flex flex-col items-center pe-2">
                  <p className="text-[16px] font-medium">Quantity</p>
                  <div className="w-[90px] h-[35px] mt-2 flex items-center justify-between px-3 border border-green-500 rounded">
                    <button
                      onClick={handleIncrement}
                      className="text-green-500 text-lg font-bold"
                    >
                      +
                    </button>
                    <span className="font-medium">
                      {productInCart?.quantity}
                    </span>
                    <button
                      onClick={handleDecrement}
                      className="text-green-500 text-lg font-bold"
                    >
                      -
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-700 hover:bg-green-800 text-white text-lg py-3 rounded-lg flex justify-center items-center gap-3 transition"
              >
                <BsCart3 />
                <span>+ Add to Cart</span>
              </button>
              <button
                onClick={() => navigate(`/product/checkout/${product?.id}`)}
                className="w-full bg-green-700 hover:bg-green-800 text-white text-lg py-3 rounded-lg flex justify-center items-center gap-3 transition"
              >
                <span>Check Out</span>
              </button>
            </div>

            {/* Product Features */}
            <div className="mt-8 bg-gray-100 border border-gray-300 rounded-lg p-5 shadow-sm">
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-semibold text-black">Wax:</span> Top
                  grade Soy wax that delivers a smokeless, consistent burn
                </li>
                <li>
                  <span className="font-semibold text-black">Fragrance:</span>{" "}
                  Premium quality ingredients with natural essential oils
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Burning Time:
                  </span>{" "}
                  70–75 hours
                </li>
                <li>
                  <span className="font-semibold text-black">Dimension:</span>{" "}
                  10cm x 5cm
                </li>
                <li>
                  <span className="font-semibold text-black">Weight:</span> 400g
                </li>
              </ul>
            </div>

            {/* Bottom Message */}
            <div className="mt-8 text-center">
              <h5 className="text-lg lg:text-xl font-bold text-gray-700 mb-2">
                All hand-made with natural soy wax, Candleaf is made for your
                pleasure moments.
              </h5>
              <p className="text-green-600 text-xl font-bold">
                🚚 FREE SHIPPING
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
