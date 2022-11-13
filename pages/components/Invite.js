import React from "react";

function Invite({ formRef }) {
  return (
    <div className="flex items-center flex-col bg-[#00000075] snap-always snap-center overflow-hidden">
      <div className="h-screen flex flex-col justify-center items-center w-full">
        <div className="text-center">
          <p className="text-white text-[80px] lg:text-[120px] font-GreatVibes">
            Haukur&apos;s{" "}
          </p>
          <p className="text-white text-[80px] lg:text-[100px] font-GreatVibes mt-[-60px] lg:mt-[-70px]">
            60th
          </p>
        </div>

        <div className="text-center">
          <p className="text-white font-Forum text-[25px] lg:text-[35px]">
            19 November 2022 - 6pm
          </p>
        </div>

        <div
          className="bg-[#ffffff70] flex flex-col md:flex-row rounded-lg p-3 cursor-pointer group hover:bg-[#9C814D95] transition ease-in-out duration-500 w-[90%] md:w-auto"
          onClick={() => {
            window.location.assign(
              "https://www.google.com/maps/place/CLAY+-+Cocktails+%26+Cuisine/@10.8075637,106.7410537,17.01z/data=!4m5!3m4!1s0x31752752280eca6d:0x7254050ac6326a17!8m2!3d10.8075446!4d106.7410753"
            );
          }}
        >
          <div className="hidden md:block">
            <img
              src="restaurant.PNG"
              className="w-[200px] h-[200px] rounded-lg"
            />
          </div>

          <div className="md:p-10 text-center md:text-left">
            <p className="font-Forum text-[27px] md:text-[30px] group-hover:text-white transition ease-in-out duration-500">
              CLAY - Cocktails & Cuisine
            </p>
            <p className="font-Forum text-[15px] md:text-[20px] group-hover:text-white transition ease-in-out duration-500">
              18 Đường Số 6, Thảo Điền, Quận 2, Thành phố Hồ Chí Minh 700000,
              Vietnam
            </p>
          </div>
        </div>

        <div
          className="bg-[#ffffff95] py-3 px-5 cursor-pointer rounded-lg hover:bg-[#9C814D95] group transition ease-in-out duration-500 mt-5 inline-block "
          onClick={() => {
            formRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <p className="text-[20px] group-hover:text-white">RSVP Now</p>
        </div>
      </div>

      <img
        src="background2.jpg"
        className="absolute z-[-10] w-screen h-full object-cover"
      />
    </div>
  );
}

export default Invite;
