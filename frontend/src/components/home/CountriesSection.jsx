import React, { useEffect, useState, useRef } from "react";
import API from "../../api/api";
import CountryCard from "../country/CountryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CountriesSection() {
  const [countries, setCountries] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(4.3);
  const [slideOffset, setSlideOffset] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Recalculate slidesPerView
  const updateSlidesToShow = () => {
    if (window.innerWidth < 768) {
      setSlidesToShow(1.1);
    } else if (window.innerWidth < 1024) {
      setSlidesToShow(2.2);
    } else if (window.innerWidth < 1640) {
      setSlidesToShow(4.2);
    } else {
      setSlidesToShow(5.3);
    }
    setSlideOffset(window.innerWidth * 0.05); // 5% offset
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  useEffect(() => {
    API.get("/countries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="pt-16 -mb-8">
      {/* სათაური და ნავიგაცია */}
      <div className="w-[90%] m-auto flex items-center justify-between mb-6 border-b-[2px] border-primary pb-4">
        <h2 className="text-3xl font-caps">პოპულარული ქვეყნები</h2>
        <div className="flex items-center gap-2">
          <button
            ref={prevRef}
            className="bg-primary text-white py-[0.6rem] px-3 transition"
          >
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <button
            ref={nextRef}
            className="bg-primary text-white py-[0.6rem] px-3 transition"
          >
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={slidesToShow}
        centeredSlides={false}
        slidesOffsetBefore={slideOffset} // მარცხნივ 5%
        slidesOffsetAfter={slideOffset}  // მარჯვნივ 5%
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="country-swiper"
      >
        {countries.map((country) => (
          <SwiperSlide key={country._id}>
            <CountryCard country={country} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
