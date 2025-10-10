import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import API from "../../api/api";
import RequireCard from "./RequireCard";

import build from "../../assets/img/city/skyline.png";
import build1 from "../../assets/img/city/cityscape.png";
import build2 from "../../assets/img/city/buildings.png";
import sun from "../../assets/img/city/sun.png";
import cloud1 from "../../assets/img/city/cloud.png";
import cloud2 from "../../assets/img/city/clouds.png";

export default function RequireSection() {
  const [requires, setRequires] = useState([]);

  useEffect(() => {
    API.get("/requires")
      .then((res) => setRequires(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".color-icon-require",
      {
        y: 300,
      },
      {
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".color-icon-require",
        },
      }
    );
  }, []);

  return (
    <section className="w-[90%] mx-auto mt-16 mb-20">
      <div className="border-b-[2px] border-primary pt-10 mb-6 pb-6 relative overflow-hidden">
        <h2 className="text-3xl font-bold mb-4 font-caps text-black">
          რა არის სამოგზაუროდ საჭირო?
        </h2>
        <p className="lg:w-[700px]">
          სამოგზაუროდ ყველაზე მნიშვნელოვანი ეტაპები და მომზადების ძირითადი
          პუნქტები ასე გამოიყურება:
        </p>

        <div className="hidden lg:block ">
          <div className="absolute right-0 bottom-0 flex gap-0 mb-[-3px]">
            <img
              className="color-icon-require w-[80px] mr-[-5px] mb-[1px]"
              src={build}
              alt="build"
            />
            <img
              className="color-icon-require w-[80px] mr-[-3px]"
              src={build1}
              alt="build1"
            />
            <img
              className="color-icon-require w-[80px]"
              src={build2}
              alt="build2"
            />

            <img
              className="color-icon-require absolute top-[-80px] right-4 w-10 "
              src={sun}
              alt="sun"
            />
            <img
              className="color-icon-require absolute top-[-55px] right-24 w-12"
              src={cloud1}
              alt="cloud1"
            />
            <img
              className="color-icon-require absolute top-[-75px] ml-4"
              src={cloud2}
              alt="cloud2"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl2:grid-cols-3 gap-12 mt-8 z-20 bg-white">
        {requires.map((item, index) => (
          <RequireCard
            key={item._id}
            requireItem={item}
            index={index} // გადაეცემა index
          />
        ))}
      </div>
    </section>
  );
}
