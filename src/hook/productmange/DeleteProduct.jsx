import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function DeleteProduct(id, onSuccess) {
  const confirm = window.confirm("Do you wany to delete?");
  if (!confirm) return;

  try {
    await updateDoc(doc(db, "products", id), {
      deleted: true,
    });
    onSuccess("Deleted!");
  } catch (error) {
    console.error("Error deleting product:", error);
    onSuccess("❌ প্রোডাক্ট ডিলিট ব্যর্থ হয়েছে।");
  }
}
