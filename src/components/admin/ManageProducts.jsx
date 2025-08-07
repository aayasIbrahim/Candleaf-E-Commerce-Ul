import { useState } from "react";

import FetchProducts from "../../hook/productmange/FetchProducts";
import DeleteProduct from "../../hook/productmange/DeleteProduct";
import UpdateProduct from "../../hook/productmange/UpdateProduct";
// crud fuction 
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
  const newTitle = prompt("Please give a new name", product.title);

  // যদি ইউজার cancel বা খালি ইনপুট দেয়, তাহলে কিছু না করেই return
  if (!newTitle || newTitle.trim() === "") {
    setMessage("Please Set Update Name");
    return;
  }

  const updated = {
    ...product,
    title: newTitle.trim(), // বাড়তি স্পেস কেটে দিচ্ছি
  };

  await UpdateProduct(product.id, updated, (msg) => {
    setMessage(msg);
    fetchProducts();
  });
};


  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 py-10">
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
