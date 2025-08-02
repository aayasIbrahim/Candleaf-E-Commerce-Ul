import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";


export default function ClientTestimonial({ name, message, image, rating }) {
  return (
    <div className=" flex flex-col justify-center items-center bg-[#F7F8FA] rounded-lg shadow-lg px-1 w-[266.14px] h-[244.99px] md:w-[350px] md:h-[295px] ">
      <img
        src={image}
        alt={name}
        className=" w-[63.87px] h-[63.91px] md:w-[84px] md:h-[84px] rounded-full mx-auto object-cover"
      />

      {/* Star Rating */}
      <div className="flex justify-center  mt-2 text-green-400">
        {/* hrer Array  bulit method Array (5) mane value asing hoi nai index asing hoisheche 5 ta, index asing hoiche but kali array and [] kali array mapping hoi nah tai ... spread use kore mapping kore ekta array banilam and jakane return kore 5 t element , index 5 ta re return korchi 5 ta element */}
        {[...Array(5)].map((_, i) => {
          return (
            <FaStar
              key={i}
              size={20}
              fill={i < rating ? "currentColor" : "gray"}
              // here all color sat gray and when rating 4 color is 4 star green
              stroke="currentColor"
            />
          );
        })}
      </div>

      <p className="font-medium text-[#1D293F] text-[19.39px] text-center leading-[25.4px] mt-[16px] mb-[4px] md:text-[22px] md:leading-[28.8px] md:px-5">
        {message}
      </p>
      <h4 className="font-semibold text-[15px] text-[#7C8087] ">{name}</h4>
    </div>
  );
}
ClientTestimonial.propTypes = {
  name: PropTypes.string.isRequired, // name should be string and required
  message: PropTypes.string.isRequired, // message should be string and required
  image: PropTypes.string.isRequired, // image URL string and required
  rating: PropTypes.number.isRequired, // rating number and required
};
