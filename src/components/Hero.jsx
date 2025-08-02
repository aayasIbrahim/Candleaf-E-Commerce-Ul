import HeroImg from "../assets/New folder/image.png";

export default function Hero() {
  return (
    <section className="bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto">
        <div className="pb-[100px]">
          <div className="text-center  px-4 pt-[119px] ">
            <h2 className="font-medium text-[40px] leading-[46.6px] tracking-[0.9px] mb-2">
              Clean and fragrant soy wax
            </h2>
            <p className="font-[16px] leading-[22.8px] text-green-700 pb-[40px] md:mt-[15px]">
              Made for your home and for your wellness
            </p>
          </div>
          <div className="flex flex-col md:flex-row-reverse md:justify-center md:mt-5 px-4">
            {/* Image Div */}
            <div className="w-full md:mt-[-80px]  ">
              <img
                src={HeroImg}
                alt="Your image"
                className="w-[420px] object-cover mx-auto "
              />
            </div>

            {/* Content Div */}
            <ul className="px-6  mx-auto  ">
              <li className="text-[16px] py-2">
                <span className="me-2">✅</span>
                <span className="me-2 font-semibold">Eco-sustainable:</span>
                <span>All recyclable materials, 0% CO2 emissions</span>
              </li>
              <li className="text-[16px] py-2">
                <span className="me-2">✅</span>
                <span className="me-2 font-semibold">Long burning:</span>
                <span>No more waste. Created for last long.</span>
              </li>
              <li className="text-[16px] py-2">
                <span className="me-2">✅</span>
                <span className="me-2 font-semibold ">Hyphoallergenic:</span>
                <span> 100% natural, human friendly ingredients </span>
              </li>
              <li className="text-[16px] py-2">
                <span className="me-2">✅</span>
                <span className="me-2 font-semibold">Handmade:</span>
                <span>All candles are craftly made with love.</span>
              </li>
            </ul>
          </div>
          <div className="mt-[40px] md:mt-[-30px] text-center py-4 mb-3">
            <a
              href=""
              className="bg-green-700 text-[20.65px] text-white px-[44px] py-[8px] rounded font-semibold transition"
            >
              See More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
