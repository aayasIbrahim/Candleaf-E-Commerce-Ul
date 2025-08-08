import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function FetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "products"), where("deleted", "==", false));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, fetchProducts };
}
