import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

import ClientTestimonial from "./Our client/ClientTestimoinal";
import clientIMG1 from "../assets/client1.png";
import clientIMG2 from "../assets/client2.png";
import clientIMG3 from "../assets/client3.png";

function OurClient() {
  return (
    <section className="bg-[#56B2801A]">
      <div className="max-w-7xl mx-auto">
        <div className=" text-center p  pt-[90px] ">
          <h2 className="font-medium text-[40px] leading-[56.6px] tracking-[0.9px] mb-2 text-center">
            Testimonials
          </h2>
          <p className="font-[16px] leading-[22.8px] text-gray-600 pb-[40px] md:mt-[15px]">
            Some quotes from our happy customers
          </p>
        </div>

        <div className="pb-[120px] md:pb-[89px]">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: {
                slidesPerView: 1, // 👈 1 card on mobile
              },
              768: {
                slidesPerView: 2, // 👈 2 cards on tablet
              },
              1024: {
                slidesPerView: 3, // 👈 3 cards on desktop
              },
            }}
          >
            {/*!flex !justify-center it works to mobile responsive at the middle each swiperslide   */}
            <SwiperSlide className="!flex !justify-center">
              <ClientTestimonial
                image={clientIMG1}
                rating={5}
                message={"“I love it! No more air fresheners”"}
                names={"Ayas Ibrahim"}
              />
            </SwiperSlide >
            <SwiperSlide className="!flex !justify-center">
              <ClientTestimonial
                image={clientIMG2}
                rating={4}
                message={"“Raccomended for everyone”"}
                name={"Edarado"}
              />
            </SwiperSlide>
            <SwiperSlide className="!flex !justify-center">
              <ClientTestimonial
                image={clientIMG3}
                rating={5}
                message={"“Looks very natural, the smell is awesome”"}
                name={"Mart"}
              />
            </SwiperSlide>
            <SwiperSlide>
              <ClientTestimonial
                image={clientIMG3}
                rating={5}
                message={"“Looks very natural, the smell is awesome”"}
                name={"Mart"}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default OurClient;
