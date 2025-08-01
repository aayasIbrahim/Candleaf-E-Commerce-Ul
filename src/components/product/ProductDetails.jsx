import useProductId from "../../hook/useProductId";
import { useParams } from "react-router-dom";
function ProductDetails() {
  const { id } = useParams();

  const product = useProductId(id);

  return <div>ProductDetails{product?.title}</div>;
}

export default ProductDetails;
