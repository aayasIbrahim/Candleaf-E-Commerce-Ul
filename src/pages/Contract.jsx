import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export default function Contract() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!productId || !productName || !price || !buyerId || !sellerId) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "contracts"), {
        productId,
        productName,
        price: Number(price),
        buyerId,
        sellerId,
        status: "pending",
        createdAt: serverTimestamp(),
        notes: "",
      });
      alert("Contract successfully created!");
      setProductId("");
      setProductName("");
      setPrice("");
      setBuyerId("");
      setSellerId("");
    } catch (error) {
      console.error("Error creating contract:", error);
      alert("Failed to create contract, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
          Create New Contract
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Fill in the details below to create a contract between buyer and seller.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="space-y-5"
          noValidate
        >
          {[
            { label: "Product ID", value: productId, setter: setProductId, placeholder: "Enter product ID" },
            { label: "Product Name", value: productName, setter: setProductName, placeholder: "Enter product name" },
            { label: "Price", value: price, setter: setPrice, placeholder: "Enter price", type: "number" },
            { label: "Buyer ID", value: buyerId, setter: setBuyerId, placeholder: "Enter buyer's user ID" },
            { label: "Seller ID", value: sellerId, setter: setSellerId, placeholder: "Enter seller's user ID" }
          ].map(({ label, value, setter, placeholder, type = "text" }) => (
            <div key={label}>
              <label className="block text-gray-700 font-semibold mb-2">{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-lg font-semibold text-white shadow-md transition-transform transform ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
            }`}
          >
            {loading ? "Creating..." : "Create Contract"}
          </button>
        </form>
      </div>
    </div>
  );
}
