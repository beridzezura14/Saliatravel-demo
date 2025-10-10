import React, { useEffect, useState, useRef } from "react";
import API from "../../api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { gsap } from "gsap";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PlacesSection() {
  const [places, setPlaces] = useState([]);
  const textRefs = useRef([]);
  const swiperRef = useRef(null);

  // Fetch places
  useEffect(() => {
    API.get("/places")
      .then((res) => setPlaces(res.data))
      .catch((err) => console.error(err));
  }, []);

  // GSAP animation for a specific slide
  const animateText = (index) => {
    const container = textRefs.current[index];
    if (!container) return;

    const title = container.querySelector("h2");
    const desc = container.querySelector("p");

    // Reset elements before animation
    gsap.set([title, desc], { opacity: 0, y: "100%" });

    // Animate sequentially
    gsap.to(title, { y: "0%", opacity: 1, duration: 1, delay: 1, ease: "power1.out" });
    gsap.to(desc, { y: "0%", opacity: 1, duration: 1, delay: 1.1, ease: "power1.out" });
  };

  // Animate first slide after places load
  useEffect(() => {
    if (places.length > 0) {
      setTimeout(() => animateText(0), 50);
    }
  }, [places]);

  // Custom navigation
  const goPrev = () => {
    if (!swiperRef.current) return;
    const prevIndex =
      swiperRef.current.realIndex === 0
        ? places.length - 1
        : swiperRef.current.realIndex - 1;
    swiperRef.current.slideTo(prevIndex);
    animateText(prevIndex);
  };

  const goNext = () => {
    if (!swiperRef.current) return;
    const nextIndex = (swiperRef.current.realIndex + 1) % places.length;
    swiperRef.current.slideTo(nextIndex);
    animateText(nextIndex);
  };


  
  // ---------- Render Skeleton if data not loaded ----------
  if (places.length === 0) {
    return (
      <section className="w-full relative h-screen flex flex-col items-center justify-center gap-6 px-4">
        <div className="h-[400px] w-full flex items-center justify-center font-colasta text-[4vw]  rounded animate-pulse text-primary">Saliatravel</div>
      </section>
    );
  }

  return (
    <section className="w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        speed={2000}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => animateText(swiper.realIndex)}
        className="place-swiper"
      >
        {places.map((place, index) => (
          <SwiperSlide key={place._id}>
            <div className="w-full h-screen relative">

            <h1
              className="
                absolute 
                left-1/2 
                bottom-[10vh] 
                lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2
                -translate-x-1/2
                text-[15vw] 
                opacity-20 
                text-white 
                font-bold 
                z-20 
                font-caps
                text-center
              "
            >
              {place.title}
            </h1>


              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${place.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div
                ref={(el) => (textRefs.current[index] = el)}
                className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"
              >
                <div className="overflow-hidden">
                  <h2
                    className="pt-2 text-6xl md:text-6xl lg:text-8xl font-bold font-caps"
                    style={{
                      textShadow: "5px 5px hsl(184, 69%, 43%)",
                      opacity: 0,
                      transform: "translateY(100%)",
                    }}
                  >
                    {place.title}
                  </h2>
                </div>
                <div className="overflow-hidden py-2">
                  <p
                    className="text-[15px] lg:text-[17px] font-colasta lg:w-[700px]"
                    style={{ opacity: 0, transform: "translateY(100%)" }}
                  >
                    {place.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom arrows */}
      <div className="absolute bottom-5 right-10 lg:right-[5%] z-20 flex gap-2">
        <button className="py-[0.6rem] px-3 bg-primary text-white" onClick={goPrev}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <button className="py-[0.6rem] px-3 bg-primary text-white" onClick={goNext}>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
    </section>
  );
}
