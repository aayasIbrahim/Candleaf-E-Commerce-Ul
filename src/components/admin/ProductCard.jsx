import PropTypes from "prop-types";
import { useGetProductsQuery } from "../../features/firebaseApi/firebaseApiSlice";
function ProductCard({ product, onDelete, onUpdate }) {
  const { data: products } = useGetProductsQuery();
  console.log("ProductCard products:", products);
  return (
    <div className="shadow-md rounded-lg p-4 bg-gray-200 hover:shadow-lg">
      <img
        src={product.img}
        alt={product.title}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <div className="flex gap-2">
        <button
          onClick={() => onUpdate(product)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    img: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
