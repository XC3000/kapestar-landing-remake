"use client";
import { Icons } from "@/components/icons";
import { InstrumentsData } from "@/data/dashboard";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "../ui/skeleton";

const navbtnIconStyles = "w-8 h-8 bg-zinc-300 p-0.5 bg-opacity-25 rounded-full";
const navbtnStyles =
  "bottom-nav__item cursor-pointer active:ring-2 ring-zinc-500 rounded-full";
const disableBtnStyles = "active:ring-0 bg-opacity-0 text-black invisible";

const breakpoints: Record<
  number,
  { slidesPerView: number; spaceBetween: number }
> = {
  0: {
    slidesPerView: 1.5,
    spaceBetween: 6,
  },
  488: {
    slidesPerView: 2,
    spaceBetween: 6,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1147: {
    slidesPerView: 5,
    spaceBetween: 24,
  },
};

const Instruments = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const totalSlides = InstrumentsData.length;
  const [swiper, setSwiper] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[1600px]">
      <div
        className={
          !swiper ? "h-0 w-0 overflow-hidden " : " h-[120px] sm:h-[135px]"
        }
      >
        <Swiper
          onSwiper={() => {
            setSwiper(true);
          }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          scrollbar={{ draggable: true }}
          breakpoints={breakpoints && breakpoints}
          navigation={{
            prevEl: ".slidePrev-btn",
            nextEl: ".slideNext-btn",
          }}
        >
          {InstrumentsData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="min-w-max  flex-1 rounded-xl border bg-white px-8  py-3 shadow-sm dark:border-zinc-600  dark:bg-zinc-800">
                <p className="mb-2 flex items-center border-b pb-1 text-sm font-medium sm:text-base">
                  {item.name}
                  <span className="pl-3 text-xs text-zinc-600 dark:text-zinc-400">
                    (Futures)
                  </span>
                </p>
                <p className="text-sm sm:text-base">{item.price}</p>
                <div
                  className={`text-sm ${
                    item.change >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <p className="mt-1 font-normal leading-tight">
                    {item.change}
                  </p>
                  <p className="text-[10px] ">({item.percentValue}%)</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {!swiper && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          <InstrumentDummy />
          <InstrumentDummy />
          <InstrumentDummy classname="hidden sm:block" />
          <InstrumentDummy classname="hidden lg:block" />
        </div>
      )}

      <div className="absolute top-10 z-10  mt-4 flex w-full items-center justify-between">
        <button
          className={`${navbtnStyles} slidePrev-btn ${
            currentIndex === 0 && disableBtnStyles
          }`}
        >
          <Icons.chevronLeft className={navbtnIconStyles} />
        </button>
        <button
          className={`${navbtnStyles} slideNext-btn ${
            currentIndex === totalSlides - 1 && disableBtnStyles
          }`}
        >
          <Icons.chevronRight className={navbtnIconStyles} />
        </button>
      </div>
    </div>
  );
};

export default Instruments;

const InstrumentDummy = ({ classname }: { classname?: string }) => {
  return (
    <div
      className={`${classname} min-w-max  flex-1 rounded-xl border px-8  py-6 shadow-sm dark:border-zinc-600`}
    >
      <div className="mb-2 flex items-center border-b pb-2 text-sm font-medium sm:text-base">
        <Skeleton className="h-4 w-36" />
      </div>
      <Skeleton className="mb-2 h-3 w-20" />
      <Skeleton className="h-3 w-12" />
    </div>
  );
};
