import React, { useState, useEffect } from "react";
import API from "../../api/api";

export default function PlaceForm({ editingPlace, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (editingPlace) {
      setTitle(editingPlace.title);
      setDescription(editingPlace.description);
    } else {
      setTitle("");
      setDescription("");
      setImageFile(null);
    }
  }, [editingPlace]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      let res;
      if (editingPlace) {
        res = await API.put(`/places/${editingPlace._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await API.post("/places", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      onSave(res.data);
      setTitle("");
      setDescription("");
      setImageFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold mb-2">
        {editingPlace ? "Edit Place" : "Add Place"}
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded"
      >
        {editingPlace ? "Update" : "Add"}
      </button>
    </form>
  );
}
