import useProducts from "./useProducts";

export default function useProductId(id) {
  const { products } = useProducts();
 const product = products.find((item) => item.id ===(id));
  return product;
}
