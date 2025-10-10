import React, { useState, useEffect } from "react";
import API from "../../api/api";
import PlaceCard from "../places/PlaceCard";
import PlaceForm from "../places/PlaceForm";

export default function PlacesSection() {
  const [places, setPlaces] = useState([]);
  const [editingPlace, setEditingPlace] = useState(null);

  const fetchPlaces = async () => {
    try {
      const res = await API.get("/places");
      setPlaces(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/places/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPlaces((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = (savedPlace) => {
    if (editingPlace) {
      setPlaces((prev) =>
        prev.map((p) => (p._id === savedPlace._id ? savedPlace : p))
      );
    } else {
      setPlaces((prev) => [savedPlace, ...prev]);
    }
    setEditingPlace(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Places</h2>
      <PlaceForm editingPlace={editingPlace} onSave={handleSave} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {places.map((place) => (
          <div key={place._id}>
            <PlaceCard place={place} />
            <div className="flex gap-2 mt-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => setEditingPlace(place)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(place._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
