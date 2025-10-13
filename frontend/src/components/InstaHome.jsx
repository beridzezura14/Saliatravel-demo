// components/InstaHome.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FiInstagram } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";

export default function InstaHome() {
  const [items, setItems] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [slideOffset, setSlideOffset] = useState(0);

  const updateSlides = () => {
    if (window.innerWidth < 768) setSlidesToShow(1.2);
    else if (window.innerWidth < 1024) setSlidesToShow(2.2);
    else if (window.innerWidth < 1640) setSlidesToShow(3.5);
    else setSlidesToShow(4);

    setSlideOffset(window.innerWidth * 0.05); // 5% დაშორება
  };

  useEffect(() => {
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get("/insta");
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setItems([]);
      }
    };
    fetchItems();
  }, []);

  return (
    <section className="pb-10 -mt-10 xl:pb-24 xl:mt-2 relative">
      {items.length > 0 ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={slidesToShow}
          slidesOffsetBefore={slideOffset}
          slidesOffsetAfter={slideOffset}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={false} // Pagination წერტილების გამორთვა
        >
          {items.map((item) => (
            <SwiperSlide key={item._id}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block hover:scale-[1.03] transition-transform rounded overflow-hidden group"
              >
                {/* სურათი */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-52 object-cover rounded brightness-75" // ფოტოს დაბნელება
                />

                {/* Overlay სათაურით */}
                {item.title && (
                  <div className="absolute top-3 right-3 bg-black/50 px-2 py-1 rounded text-white text-sm font-caps">
                    {item.title}
                  </div>
                )}

                {/* Instagram აიქონი hover-ზე */}
                <div className="absolute top-3 left-3 text-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiInstagram />
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center col-span-full">მონაცემები არ არის.</p>
      )}
    </section>
  );
}
