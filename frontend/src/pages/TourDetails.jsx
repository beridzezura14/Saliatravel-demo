import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [openDays, setOpenDays] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await API.get(`/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
    window.scrollTo(0, 0);
  }, [id]);

  const toggleDay = (index) => {
    setOpenDays((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // 🔹 თუ იტვირთება → skeleton placeholder
  if (loading) {
    return (
      <div className="max-w-[90%] mx-auto mt-32 mb-20 animate-pulse">
        {/* Back Button და სათაური */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-8 lg:gap-4">
          <div className="w-[130px] h-[40px] bg-gray-300 rounded-full" />
          <div className="h-[40px] w-[250px] bg-gray-300 rounded-md" />
        </div>

        {/* Image placeholder */}
        <div className="w-full h-64 md:h-96 bg-gray-300 rounded-lg mb-6" />

        {/* Description placeholder */}
        <div className="h-[24px] bg-gray-300 w-[80%] mb-6" />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Days column */}
          <div className="lg:w-1/2 mt-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[60px] bg-gray-200 rounded-lg" />
            ))}
          </div>

          {/* Right column */}
          <div className="lg:w-1/2 flex flex-col gap-8 lg:mt-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-[28px] bg-gray-300 w-[50%] rounded" />
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-[16px] bg-gray-200 w-[90%] rounded" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 🔹 მთავარი ნამდვილი შიგთავსი
  return (
    <div className="max-w-[90%] mx-auto mt-32 mb-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-8 lg:gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-[130px] py-2 bg-[#22afb9] text-white rounded-full hover:bg-[#1c8b95] transition"
        >
          ← უკან
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-caps text-[#22afb9] text-center md:text-right">
          {tour.head}
        </h1>
      </div>

      <div className="w-full mb-6">
        <img
          src={tour.img}
          alt={tour.head}
          className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg border-2 border-[#22afb9]"
        />
      </div>

      <p className="text-[#3b3b3b] border-b-2 border-primary pb-6 lg:mt-6 text-lg md:text-xl">
        {tour.includes}
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 mt-6">
          <h2 className="text-2xl md:text-3xl font-caps mb-4 text-[#22afb9]">
            დღეები
          </h2>
          {tour.details.day.map((d, i) => (
            <div key={i} className="mb-3 border rounded-lg shadow-sm bg-[#fff]">
              <button
                onClick={() => toggleDay(i)}
                className="w-full text-left p-4 flex justify-between items-center border-l-4 border-[#22afb9] focus:outline-none"
              >
                <span className="font-semibold text-[#3b3b3b] text-lg md:text-xl">
                  {d.head}
                </span>
                <span className="text-[#22afb9] font-bold">
                  {openDays[i] ? "−" : "+"}
                </span>
              </button>
              {openDays[i] && (
                <p className="p-4 pt-0 text-[#3b3b3b]">{d.paragraph}</p>
              )}
            </div>
          ))}
        </div>

        <div className="lg:w-1/2 flex flex-col gap-8 lg:mt-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-caps mb-4 text-[#22afb9]">
              ფასში შედის
            </h2>
            <ul className="list-disc pl-6 text-[#3b3b3b]">
              {tour.details.inPrice.map((item, i) => (
                <li key={i} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-caps mb-4 text-[#22afb9]">
              აუცილებელია გადასახდელი
            </h2>
            <ul className="list-disc pl-6 text-[#3b3b3b]">
              {tour.details.mustPay.map((item, i) => (
                <li key={i} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-caps mb-4 text-[#22afb9]">
              დამატებითი ტურები
            </h2>
            <ul className="list-disc pl-6 text-[#3b3b3b]">
              {tour.details.additionTours.map((item, i) => (
                <li key={i} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
