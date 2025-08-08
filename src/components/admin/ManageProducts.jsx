import { useState } from "react";

import FetchProducts from "../../utils/productmange/FetchProducts";
import DeleteProduct from "../../utils/productmange/DeleteProduct";
import UpdateProduct from "../../utils/productmange/UpdateProduct";
import ProductCard from "./ProductCard";

function ManageProducts() {
  const { products, loading, fetchProducts } = FetchProducts();
  const [message, setMessage] = useState("");

  const handleDelete = async (id) => {
    await DeleteProduct(id, (msg) => {
      setMessage(msg);
      fetchProducts();
    });
  };

  const handleUpdate = async (product) => {
    const newTitle = prompt("Please give a new title", product.title);
    if (newTitle === null) {
      setMessage("Update cancelled.");
      return;
    }

    const newPrice = prompt("Please give a new price", product.price);
    if (newPrice === null) {
      setMessage("Update cancelled.");
      return;
    }

    if (!newTitle.trim()) {
      setMessage("Please provide a valid title");
      return;
    }

    const priceValue = parseFloat(newPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      setMessage("Please provide a valid positive price");
      return;
    }

    const updated = {
      ...product,
      title: newTitle.trim(),
      price: priceValue,
    };

    await UpdateProduct(product.id, updated, (msg) => {
      setMessage(msg);
      fetchProducts();
    });
  };

  return (
    <div className="max-w-4xl  mx-auto mt-10 px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">📦 All Products</h2>
      {message && <p className="text-center mb-4 text-green-600">{message}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageProducts;
