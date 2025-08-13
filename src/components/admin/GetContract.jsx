import { useGetFormDataQuery, useDeleteFormdataMutation } from "../../features/firebaseApi/firebaseApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GetContract() {
  const { data: contracts, isLoading, isError } = useGetFormDataQuery();
  const [deleteFormData] = useDeleteFormdataMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      try {
        await deleteFormData(id).unwrap();
        toast.success("Contract deleted successfully");
      } catch {
        toast.error("Failed to delete contract");
      }
    }
  };

  if (isLoading) return <p className="text-center py-6">Loading contracts...</p>;
  if (isError) return <p className="text-center py-6 text-red-500">Failed to load contracts.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact List</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-3">Product Name</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Buyer</th>
              <th className="border p-3">Seller</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts?.length > 0 ? (
              contracts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="border p-3">{c.productName}</td>
                  <td className="border p-3">${c.price}</td>
                  <td className="border p-3">{c.buyerId}</td>
                  <td className="border p-3">{c.sellerId}</td>
                  <td className="border p-3">{c.status}</td>
                  <td className="border p-3">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No contracts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {contracts?.length > 0 ? (
          contracts.map((c) => (
            <div key={c.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
              <p className="font-semibold text-gray-800">{c.productName}</p>
              <p className="text-sm text-gray-600">Price: ${c.price}</p>
              <p className="text-sm text-gray-600">Buyer: {c.buyerId}</p>
              <p className="text-sm text-gray-600">Seller: {c.sellerId}</p>
              <p className="text-sm text-gray-600">Status: {c.status}</p>
              <button
                onClick={() => handleDelete(c.id)}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No contracts found</p>
        )}
      </div>
    </div>
  );
}
