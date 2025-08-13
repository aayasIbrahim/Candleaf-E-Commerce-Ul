
// import FetchProducts from "../../utils/productmange/FetchProducts";
import { useGetProductsQuery } from "../../features/firebaseApi/firebaseApiSlice";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

function PopularProducts() {
  const { data: products } = useGetProductsQuery();

  const popularproducts = products?.slice(-6);
  console.log(popularproducts);

  return (
    <section>
      <div className="max-w-7xl mx-auto">
        <div className="text-center pt-[90px]">
          <h2 className="font-medium text-[40px] leading-[56.6px] tracking-[0.9px] mb-2">
            Popular
          </h2>
          <p className="font-[16px] leading-[22.8px] text-gray-600 pb-[40px] md:mt-[15px]">
            Our top selling product that you may like
          </p>
        </div>

        <div className="my-[75px] md:mb-[120px] flex justify-center m">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            speed={1500}
            className="w-[350px] md:w-[400px] rounded-lg shadow-lg bg-white md:w-[320px]"
          >
            {popularproducts?.map((product) => (
              <SwiperSlide key={product.id}>
                <Link
                  to={`/product/popular/${product.id}`}
                  className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-[250px] object-cover bg-gray-200"
                  />
                  <div className="px-4 py-3 flex justify-between items-center bg-green-700">
                    <p className="text-white text-lg font-semibold truncate max-w-[65%]">
                      {product.title}
                    </p>
                    <p className="text-white text-xl font-bold">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default PopularProducts;
