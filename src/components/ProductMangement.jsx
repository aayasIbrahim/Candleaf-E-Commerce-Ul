import Addproduct from "./admin/Addproduct";
import ManageProducts from "./admin/ManageProducts";

export default function ProductMangement() {
  return (
    <section className="">
      <div className="container mx-auto ">
        <Addproduct />
        <ManageProducts />
      </div>
    </section>
  );
}
