"use client";
import Image from "next/image";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icons } from "../icons";

const data = [
  {
    img: "uttam.png",
    review:
      " The way data is presented on trade dons is very easy to understand for a beginners like me with the help of tutorial videos",
    name: "Uttam Bangar",
    profession: "IT Professional, Trader",
    location: "Pune",
  },
  {
    img: "aniket.jpg",
    review:
      "The speed of data is super fast and real time. This is incredible and very useful for trading in options.",
    name: "Aniket Barve",
    profession: "Entrepreneur/ Trader",
    location: "Pune",
  },
  {
    img: "vineet.jpg",
    review:
      "It was very easy to understand the data reading on TRADE DONS with the help of tutorial videos.",
    name: "Vineet Magzi",
    profession: "Trader",
    location: "Hydrabad",
  },
];
const Slider = () => {
  return (
    <Swiper
      className="m-auto max-h-[420px] "
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop
      slidesPerView={1}
      modules={[Autoplay]}
      direction="vertical"
    >
      {data.map((user, index) => {
        return (
          <SwiperSlide key={index} className="max-h-max">
            <div className="mx-auto mt-12  max-w-lg rounded-lg  px-2 py-4  md:mt-0 md:flex">
              <div>
                <Image
                  src={`/assets/landing-page/reviews/${user.img}`}
                  width={100}
                  height={100}
                  className="mb-4 ml-4 h-20 w-20 max-w-max rounded-full object-cover md:mb-0 md:ml-0"
                  alt="user"
                />
              </div>
              <div className="pl-4">
                <p className="font-medium text-zinc-600 dark:text-zinc-400 ">
                  {user.review}
                </p>
                <p className="mt-3 font-semibold ">{user.name}</p>
                <p className="mt-1 text-sm capitalize  text-blue-900 dark:text-blue-600">
                  ({user.profession})
                </p>

                <p className="text-s mt-2 flex items-center text-sm font-semibold">
                  <Icons.mapPin />
                  <span className="ml-1">{user.location}</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
