import React, { useState, useEffect } from "react";
import API from "../../api/api";
import CountryCard from "../country/CountryCard";
import CountryForm from "../country/CountryForm";

export default function CountriesSection() {
  const [countries, setCountries] = useState([]);
  const [editingCountry, setEditingCountry] = useState(null);

  const fetchCountries = async () => {
    try {
      const res = await API.get("/countries");
      setCountries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleDeleteCountry = async (id) => {
    try {
      await API.delete(`/countries/${id}`);
      setCountries((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveCountry = (savedCountry) => {
    if (editingCountry) {
      setCountries((prev) =>
        prev.map((c) => (c._id === savedCountry._id ? savedCountry : c))
      );
    } else {
      setCountries((prev) => [savedCountry, ...prev]);
    }
    setEditingCountry(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Countries</h2>
      <CountryForm editingCountry={editingCountry} onSave={handleSaveCountry} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {countries.map((country) => (
          <div key={country._id}>
            <CountryCard country={country} />
            <div className="flex gap-2 mt-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => setEditingCountry(country)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteCountry(country._id)}
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
