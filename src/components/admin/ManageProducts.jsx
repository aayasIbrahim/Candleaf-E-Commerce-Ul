import { useGetProductsQuery, useUpdateProductMutation, useSoftDeleteProductMutation } from "../../features/firebaseApi/firebaseApiSlice";
import { toast } from "react-toastify";

function ManageProducts() {
  const { data: products, isLoading } = useGetProductsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [softDeleteProduct] = useSoftDeleteProductMutation();

  const handleDelete = async (id) => {
    try {
      await softDeleteProduct(id).unwrap();
      toast.success("Product deleted!");
    } catch {
      toast.error("Delete failed!");
    }
  };

  const handleUpdate = async (product) => {
    console.log("Update clicked"); // Debugging log
    const newTitle = prompt("Please give a new title", product.title);
    if (newTitle === null) {
      toast.info("Update cancelled.");
      return;
    }

    const newPrice = prompt("Please give a new price", product.price);
    if (newPrice === null) {
      toast.info("Update cancelled.");
      return;
    }

    if (!newTitle.trim()) {
      toast.error("Please provide a valid title");
      return;
    }

    const priceValue = parseFloat(newPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast.error("Please provide a valid positive price");
      return;
    }

    const updated = {
      title: newTitle.trim(),
      price: priceValue,
    };

    try {
      await updateProduct({ id: product.id, updatedProduct: updated }).unwrap();
      toast.success("Product updated!");
    } catch {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">📦 All Products</h2>
      {isLoading ? (
        <h2 className="text-center">loading</h2>
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
                <h3 className="text-lg font-semibold mb-2">
                  {product.title}
                </h3>
                <p className="text-green-600 text-xl mb-4">
                  ${Number(product.price).toFixed(2)}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleUpdate(product)}
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
    </div>
  );
}

export default ManageProducts;