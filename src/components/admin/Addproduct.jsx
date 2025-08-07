import { useState } from "react";
import { db } from '../../firebase/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Addproduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!img) {
      setMessage("Give Me Image Url");
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setMessage("Please Give me Valid Price");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // ✅ Save to Firestore with 'deleted: false' for soft delete support
      await addDoc(collection(db, "products"), {
        title,
        price: numericPrice,
        img,
        deleted: false, // <--- This is  soft delete for using which not deleted to data  base and but client section deleted
        createdAt: serverTimestamp(),
      });

      setMessage("✅ Product Add Successful");
      setTitle("");
      setPrice("");
      setImg("");
    } catch (error) {
      console.error("Add product error:", error);
      setMessage(" Product does not add");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
      <h2 className="text-xl font-bold text-center mb-5">Add New Product</h2>
      {message && (
        <p className="text-center mb-4 text-sm font-medium text-red-600">
          {message}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 shadow-lg rounded-lg mb-[50px]"
      >
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-3 w-full"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded p-3 w-full"
          required
        />
        <input
          type="text"
          placeholder="Image URL ('https://i.pravatar.cc/150?img=4')"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="border rounded p-2 w-full bg-gray-50"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default Addproduct;
