import { useState } from "react";
import useProducts from "../hook/useProducts";
import img from "../assets/image 1.png";

function AllProducts() {
  const { products, loading, error } = useProducts();

  const [showAll, setShowAll] = useState(false);

  // mobile e 4 ta and destop sob dakanor jonno ei logic taaaaa
  const visibleProducts = showAll
    ? products
    : window.innerWidth < 768
    ? products.slice(0, 4)
    : products;

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

        <div className="flex flex-col items-center justify-center md:flex-row md:flex-wrap gap-4 p-4">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow w-[250px] text-center"
            >
              <img
                src={img}
                alt={product.title}
                className="w-full h-[200px] object-cover mb-2"
              />
              <p className="text-xl font-semibold">{product.title}</p>
              <p className="text-lg text-green-700">${product.price}</p>
            </div>
          ))}

          {/* Show button only on mobile and when not showing all */}
          {!showAll && window.innerWidth < 768 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAll(true)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                See More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllProducts;
