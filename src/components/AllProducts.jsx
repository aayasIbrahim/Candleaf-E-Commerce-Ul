import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../hook/useProducts";
import img from "../assets/image 1.png";

function AllProducts() {
  const { products, loading, error } = useProducts();

  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleShow = () => setShowAll((prev) => !prev);

  // Detect window size change
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // যদি মোবাইল ভিউ হয় এবং showAll false থাকে তাহলে ৪ টা দেখাবে
  const visibleProducts =
    isMobile && !showAll ? products.slice(0, 4) : products;

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error loading products</p>
    );

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-[15px]">
        <h2 className="text-[40px] font-semibold text-center leading-[57.6px] mt-[50px] mb-[15px]">
          Products
        </h2>
        <p className="text-[18px] text-center text-gray-700">
          Order it for you or for your beloved ones
        </p>

        <div className="flex flex-col items-center justify-center md:flex-row md:flex-wrap space-y-[20px] md:space-y-0 gap-[30px] my-[75px] md:mb-[120px]">
          {visibleProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="p-3 rounded shadow-xl"
            >
              <img
                src={img}
                alt={product.title}
                className="w-full bg-[#F7F8FA] object-cover mb-2"
              />
              <div className="flex justify-between">
                <p className="text-[16px] font-medium mt-[7px]">
                  {product.title}
                </p>
                <p className="text-[17px] text-green-700 mt-[23px]">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}

          {/* Show toggle button only on mobile */}
          {isMobile && (
            <div className="text-center mt-4">
              <button
                onClick={toggleShow}
                className="bg-green-700 cursor-pointer text-[20.65px] text-white px-[44px] py-[8px] rounded font-semibold transition mt-5"
              >
                {showAll ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllProducts;
