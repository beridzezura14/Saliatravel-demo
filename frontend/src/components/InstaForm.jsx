// src/components/InstaForm.jsx
import React, { useState, useEffect } from "react";
import API from "../api/api";

export default function InstaForm() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // რედაქტირებისთვის
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    price: "",
    link: "",
  });

  // Load items
  const fetchItems = async () => {
    try {
      const res = await API.get("/insta");
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Form submit (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image && !editingItem) return alert("Image და Link აუცილებელია!");
    if (!formData.link && !editingItem) return alert("Link აუცილებელია!");

    const data = new FormData();
    if (formData.image) data.append("image", formData.image);
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("link", formData.link);

    try {
      if (editingItem) {
        // ❗ Edit existing item
        await API.put(`/insta/${editingItem._id}`, data);
        setEditingItem(null);
      } else {
        // ❗ Create new item
        await API.post("/insta", data);
      }

      setFormData({ image: null, title: "", price: "", link: "" });
      fetchItems();
      alert("წარმატებით დამუშავდა!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "შეცდომა დაფიქსირდა");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("დარწმუნებული ხართ, რომ გინდათ წაშლა?")) return;
    try {
      await API.delete(`/insta/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      image: null, // ახალი ფოტო მხოლოდ თუ აიტვირთება
      title: item.title || "",
      price: item.price || "",
      link: item.link || "",
    });
  };

  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">📸 Instagram</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-8 max-w-full mx-auto">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="სათაური"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="ფასი"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="ლინკი"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          {editingItem ? "რედაქტირება" : "დამატება"}
        </button>
        {editingItem && (
          <button
            type="button"
            onClick={() => {
              setEditingItem(null);
              setFormData({ image: null, title: "", price: "", link: "" });
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            გაუქმება
          </button>
        )}
      </form>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="relative border p-2 rounded shadow-sm">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded" />
                {item.title && <h3 className="mt-2 text-center font-medium">{item.title}</h3>}
                {item.price > 0 && <p className="text-center text-gray-600">{item.price} ₾</p>}
              </a>
              <div className="absolute top-3 right-3 flex gap-1">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-primary text-white px-2 py-1 rounded"
                >
                  edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">მონაცემები არ არის.</p>
        )}
      </div>
    </section>
  );
}
