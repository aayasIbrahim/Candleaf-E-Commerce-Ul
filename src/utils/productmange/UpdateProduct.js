import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default async function useUpdateProduct(id, updatedData, onSuccess) {
  try {
    await updateDoc(doc(db, "products", id), updatedData);
    onSuccess("Product Update!");
  } catch {
    onSuccess("Product don't update");
  }
}
