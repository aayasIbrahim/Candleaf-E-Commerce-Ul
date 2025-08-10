import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  getDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const firebaseApiSlice = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      async queryFn(product) {
        try {
          const docRef = await addDoc(collection(db, "products"), product);
          return { data: { ...product, id: docRef.id } };
        } catch (error) {
          console.error("Error adding product: ", error);
          return { error: { message: "Failed to add product" } };
        }
      },
      invalidatesTags: ["products"],
    }),
    getProducts: builder.query({
      async queryFn() {
        try {
          // Only fetch products where deleted == false
          const productsCollection = collection(db, "products");
          const q = query(productsCollection, where("deleted", "==", false));
          const snapshot = await getDocs(q);
          const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { data: products };
        } catch (error) {
          console.error("Error fetching products: ", error);
          return { error: { message: "Failed to fetch products" } };
        }
      },
      providesTags: ["products"],
    }),
    getProductById: builder.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, "products", id);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            return { error: { message: "Product not found" } };
          }
          return { data: { id: docSnap.id, ...docSnap.data() } };
        } catch (error) {
          console.error("Error fetching product by ID: ", error);
          return { error: { message: "Failed to fetch product" } };
        }
      },
      providesTags: ["products"],
    }),
    softDeleteProduct: builder.mutation({
      async queryFn(id) {
        try {
          const docRef = doc(db, "products", id);
          await updateDoc(docRef, { deleted: true });
          return { data: { id } };
        } catch (error) {
          console.error("Error soft deleting product: ", error);
          return { error: { message: "Failed to delete product" } };
        }
      },
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      async queryFn({ id, updatedProduct }) {
        try {
          const docRef = doc(db, "products", id);
          await updateDoc(docRef, updatedProduct);
          return { data: { id, ...updatedProduct } };
        } catch (error) {
          console.error("Error updating product: ", error);
          return { error: { message: "Failed to update product" } };
        }
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSoftDeleteProductMutation,
  useUpdateProductMutation,
} = firebaseApiSlice;
