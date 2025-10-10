import React from "react";
import { useNavigate } from "react-router-dom";

export default function ToursCard({ tour }) {
  const navigate = useNavigate();

  return (
    <div 
      className="border rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/tours/${tour._id}`)}
    >
      <img src={tour.img} alt={tour.head} className="w-full h-64 object-cover"/>
      <div className="p-4">
        <h3 className="text-xl font-caps">{tour.head}</h3>
        <p className="text-gray-700 mt-2">{tour.includes}</p>
      </div>
    </div>
  );
}
