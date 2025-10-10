// components/CountryForm.jsx
import React, { useState, useEffect } from "react";
import API from "../../api/api";

export default function CountryForm({ editingCountry, onSave }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCountry) {
      setTitle(editingCountry.title);
      setImage(null); // რედაქტირების დროს ახალი ფოტო აიტვირთება თუ საჭიროა
    }
  }, [editingCountry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);

    try {
      let res;
      if (editingCountry) {
        res = await API.put(`/countries/${editingCountry._id}`, formData);
      } else {
        res = await API.post("/countries", formData);
      }
      onSave(res.data);
      setTitle("");
      setImage(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded p-4 mb-6 shadow flex flex-col gap-3"
    >
      <h2 className="text-xl font-bold">
        {editingCountry ? "Edit Country" : "Add Country"}
      </h2>
      <input
        type="text"
        placeholder="Country Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2 rounded"
        accept="image/*"
      />
      <button
        type="submit"
        className={`bg-blue-500 text-white p-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : editingCountry
          ? "Update Country"
          : "Add Country"}
      </button>
    </form>
  );
}
