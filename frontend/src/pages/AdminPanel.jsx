// import React from "react";
import PlacesSection from "../components/admin/PlacesSection";
import CountriesSection from "../components/admin/CountriesSection";
import PasswordSection from "../components/admin/PasswordSection";
import RequireAdminSection from "../components/admin/RequireAdminSection";
import ToursForm from "../components/tours/ToursForm";
import AdminContacts from "../components/admin/AdminContacts"; 

import InstaForm from "../components/InstaForm";


import React, { useState, useEffect } from "react";
import API from "../api/api";

export default function AdminPanel() {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);

  const fetchTours = async () => {
    try {
      const res = await API.get("/tours");
      setTours(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // ტურის წაშლა
  const handleDelete = async (tourId) => {
    if (!window.confirm("დარწმუნებული ხართ, რომ გინდათ ტურის წაშლა?")) return;
    try {
      await API.delete(`/tours/${tourId}`);
      setTours(tours.filter((t) => t._id !== tourId)); // ადგილობრივ state-შიაც წაშლა
      if (selectedTour?._id === tourId) setSelectedTour(null); // თუ Form-ში იყო, გაუფრთხილდეთ
      alert("ტური წაშლილია!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "დაფიქსირდა შეცდომა");
    }
  };

  return (
    <div className="container mx-auto py-24">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <InstaForm />
      <PasswordSection />
      <PlacesSection />
      <CountriesSection />

      {/* Form */}
      <ToursForm tour={selectedTour} onSuccess={fetchTours} />

      {/* List of tours */}
      <div className="mt-6">
        {tours.map((t) => (
          <div key={t._id} className="mb-4 border p-2 rounded flex justify-between items-center">
            <h2 className="font-bold">{t.head}</h2>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 px-2 py-1 rounded"
                onClick={() => setSelectedTour(t)}
              >
                რედაქტირება
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(t._id)}
              >
                წაშლა
              </button>
            </div>
          </div>
        ))}
      </div>

      <RequireAdminSection />
      <AdminContacts />
    </div>
  );
}
