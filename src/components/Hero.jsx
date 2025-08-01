
import heroImg from "../assets/New folder/image.png"
export default function Hero() {
  return (
    <section className="bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto">
        <div>
          <div className="text-center md:text-left px-4 pt-[119px]">
            <h2 className="font-medium text-[40px] leading-[46.6px] tracking-[0.9px] mb-2">
              Clean and fragrant soy wax
            </h2>
            <p className="font-[16px] leading-[22.8px] text-green-700 pb-[40px]">
              Made for your home and for your wellness
            </p>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center  px-4">
            {/* Image Div */}
            <div className="w-full ">
              <img
                src={heroImg}
                alt="Your image"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Content Div */}
            <div className="">
              <h2 className="text-2xl font-bold mb-4">Your Title</h2>
              <p className="text-gray-700">Your content goes here...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
