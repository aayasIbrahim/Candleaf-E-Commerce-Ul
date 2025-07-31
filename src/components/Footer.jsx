import FooterIMG from "../assets/footer.png";

function Footer() {
  return (
    <footer className="bg-black text-white pb-[85px] md:pt-[60px] md:pb-[120px]">
      <div className="max-w-7xl mx-auto px-[15px] py-[30px] ">
        <div className="border-t-4 border-gray-400 md:flex">
          <div className=" md:w-[50%]">
            <img
              src={FooterIMG}
              alt="footerimg"
              className="block md:w-[236px] md:h-[63.36px] md:mt-[16px]"
            />
            <p className="text-[16px] leading-[22.8px] md:pe-[100px] md:mt-3">
              Your natural candle made for your home and for your wellness.
            </p>
          </div>
          <div className="md:w-[50%] flex flex-wrap md:flex-nowrap md:space-x-7 ">
            <div className="w-[50%] mt-5 ">
              <h4 className="text-[16px] text-green-400 mt-[16px]">
                Discovery
              </h4>
              <ul>
                <li className="text-[16px] text-white mt-[24px]">New season</li>
                <li className="text-[16px] text-white mt-[24px]">
                  Most searched
                </li>
                <li className="text-[16px] text-white mt-[24px]">
                  Most selled
                </li>
              </ul>
            </div>
            <div className="w-[50%] mt-5">
              <h4 className="text-[16px] text-green-400 mt-[16px]">About</h4>
              <ul>
                <li className="text-[16px] text-white mt-[24px]">Help</li>
                <li className="text-[16px] text-white mt-[24px]">Shipping</li>
                <li className="text-[16px] text-white mt-[24px]">Affiliate</li>
              </ul>
            </div>
            <div className="md:w-[50%] mt-5">
              <h4 className="text-[16px] text-green-400 mt-[16px]">Info</h4>
              <ul>
                <li className="text-[16px] text-white mt-[24px]">
                  Contacts Us
                </li>
                <li className="text-[16px] text-white mt-[24px]">
                  Privacy Poicy
                </li>
                <li className="text-[16px] text-white mt-[24px]">
                  Terms & Conditions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
