import { useState } from "react";
import { useGetProductsQuery, useUpdateProductMutation, useSoftDeleteProductMutation } from "../../features/firebaseApi/firebaseApiSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

function ManageProducts() {
  const { data: products, isLoading } = useGetProductsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [softDeleteProduct] = useSoftDeleteProductMutation();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ title: "", price: "" });

  const openModal = (product) => {
    setEditProduct(product);
    setForm({ title: product.title, price: product.price });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditProduct(null);
    setForm({ title: "", price: "" });
  };

  const handleDelete = async (id) => {
    try {
      await softDeleteProduct(id).unwrap();
      toast.success("Product deleted!");
    } catch {
      toast.error("Delete failed!");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Please provide a valid title");
      return;
    }
    const priceValue = parseFloat(form.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast.error("Please provide a valid positive price");
      return;
    }
    try {
      await updateProduct({
        id: editProduct.id,
        updatedProduct: { title: form.title.trim(), price: priceValue },
      }).unwrap();
      toast.success("Product updated!");
      closeModal();
    } catch {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">📦 All Products</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-3">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="shadow-md rounded-lg p-4 bg-gray-200 hover:shadow-lg"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-[200px] object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-green-600 text-xl mb-4">
                  ${Number(product.price).toFixed(2)}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => openModal(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No products found.</p>
          )}
        </div>
      )}

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center   bg-opacity-70 px-5">
          <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-green-700">Update Product</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Price</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageProducts;