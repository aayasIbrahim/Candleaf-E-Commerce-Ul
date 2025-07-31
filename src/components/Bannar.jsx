import { useScroll, useTransform, motion } from "framer-motion";
import DestopIMG from "../assets/Desktop/bg-image.png";
import MobileIMG from "../assets/Mobile/bg-image.png";

function Bannar() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);  // adjust as needed

  return (
    <section className="w-full overflow-hidden">
      <motion.div style={{ scale }} className="relative w-full h-auto md:h-auto z-[-1]">
        {/* Desktop Image */}
        <img
          src={DestopIMG}
          alt="Desktop Banner"
          className="hidden md:block w-full h-[750px] object-cover"
        />

        {/* Mobile Image */}
        <img
          src={MobileIMG}
          alt="Mobile Banner"
          className="block md:hidden w-full h-[780px] object-cover"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4 opacity-70">
          <div className="max-w-7xl mx-auto w-full text-center md:px-[170px]">
            <div className="bg-white flex flex-col items-center justify-center space-y-5 bg-opacity-50 p-6 rounded-lg px-[23px]">
              <span className="text-[45px] leading-[47.6px]">🌱</span>
              <p className="text-black font-bold text-[40px] leading-[47.6px]">The nature candle</p>
              <p className="text-base text-[22px] md:text-lg mb-6 dark:text-gray-900">
                All handmade with natural soy way, Candleaf is a companion for all your pleasure moments
              </p>
              <p  className="bg-green-400  text-white px-6 py-3 rounded font-semibold transition mb-6 md:mb-[23px]">
                Discovery our collection
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Bannar;
