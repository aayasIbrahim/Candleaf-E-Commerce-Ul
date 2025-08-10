import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useAddProductMutation } from "../../features/firebaseApi/firebaseApiSlice";

function Addproduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [addProduct, { isLoading: apiLoading }] = useAddProductMutation();

  // Handle image upload to Cloudinary
  const handleUploadImg = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setImgLoading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "candyleaf_preset");
      data.append("cloud_name", "dexe6nhmm");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dexe6nhmm/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const fileUrl = await res.json();
      if (fileUrl.secure_url) {
        setImg(fileUrl.secure_url);
        toast.success("Image uploaded!");
      } else {
        throw new Error("Image upload failed");
      }
    } catch {
      toast.error("Image upload failed");
      setImg("");
    } finally {
      setImgLoading(false);
    }
  };

  // Handle form submit to Firestore via RTK Query
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!img) {
      toast.error("Please Upload Image");
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      toast.error("Please Give me Valid Price");
      return;
    }

    setLoading(true);

    try {
      await addProduct({
        title,
        price: numericPrice,
        img,
        deleted: false,
        createdAt: new Date().toISOString(),
      }).unwrap();

      toast.success("Product Add Successful");
      setTitle("");
      setPrice("");
      setImg("");
    } catch (error) {
      console.error("Add product error:", error);
      toast.error("Product does not add");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 px-4 py-6">
      <h2 className="text-2xl text-green-600 font-bold text-center mb-7 tracking-wide">
        Add New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 px-8 py-8 shadow-2xl rounded-xl bg-white"
      >
        {/* Product Title Input */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Product Title
          </label>
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 outline-none transition"
            required
          />
        </div>
        {/* Product Price Input */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 outline-none transition"
            required
          />
        </div>
        {/* Image Upload Input */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Product Image
          </label>
          <div className="flex flex-col items-center">
            {!img ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadImg}
                  ref={fileInputRef}
                  className="hidden"
                  disabled={imgLoading}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  disabled={imgLoading}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg border-2 border-dashed border-green-400 text-green-700 bg-green-50 hover:bg-green-100 transition font-medium shadow-sm ${
                    imgLoading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  <FiUploadCloud size={22} />
                  {imgLoading ? "Uploading..." : "Upload Image"}
                </button>
              </>
            ) : (
              <div className="relative group">
                <img
                  src={img}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-green-400 shadow mb-2"
                />
                <button
                  type="button"
                  onClick={() => setImg("")}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition opacity-80 group-hover:opacity-100"
                  title="Remove image"
                >
                  <MdClose size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || imgLoading || apiLoading}
          className={`w-full py-3 rounded-lg text-white font-semibold text-lg shadow-md transition ${
            loading || imgLoading || apiLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading || apiLoading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default Addproduct;