import React, { useState, useEffect } from "react";
import API from "../../api/api";

export default function ToursForm({ tour, onSuccess }) {
  const [form, setForm] = useState({
    head: "",
    imgFile: null, // ახალი ატვირთული სურათი
    imgUrl: "", // რედაქტირებისას არსებული სურათი
    includes: "",
    details: { day: [], inPrice: [], additionTours: [], mustPay: [] },
  });

  useEffect(() => {
    if (tour) {
      setForm({
        head: tour.head || "",
        imgFile: null,
        imgUrl: tour.img || "", // სერვერიდან არსებული სურათი
        includes: tour.includes || "",
        details: {
          day: tour.details?.day || [],
          inPrice: tour.details?.inPrice || [],
          additionTours: tour.details?.additionTours || [],
          mustPay: tour.details?.mustPay || [],
        },
      });
    }
  }, [tour]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, value, index) => {
    const newArr = [...form.details[field]];
    newArr[index] = value;
    setForm({ ...form, details: { ...form.details, [field]: newArr } });
  };

  const handleDayChange = (index, field, value) => {
    const newDays = [...form.details.day];
    newDays[index][field] = value;
    setForm({ ...form, details: { ...form.details, day: newDays } });
  };

  const addArrayItem = (field) => {
    setForm({ ...form, details: { ...form.details, [field]: [...form.details[field], ""] } });
  };

  const addDay = () => {
    setForm({ ...form, details: { ...form.details, day: [...form.details.day, { head: "", paragraph: "" }] } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("head", form.head);
      formData.append("includes", form.includes);
      formData.append("details", JSON.stringify(form.details));

      if (form.imgFile) formData.append("imgFile", form.imgFile); // ახალი ატვირთული სურათი

      if (tour?._id) {
        await API.put(`/tours/${tour._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("ტური განახლდა!");
      } else {
        await API.post("/tours", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("ახალი ტური დამატებულია!");
      }

      if (onSuccess) onSuccess();

      setForm({
        head: "",
        imgFile: null,
        imgUrl: "",
        includes: "",
        details: { day: [], inPrice: [], additionTours: [], mustPay: [] },
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "დაფიქსირდა შეცდომა");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg my-14 p-4 bg-white space-y-4">
      <input type="text" name="head" placeholder="ტურის სახელი" value={form.head} onChange={handleChange} className="w-full border p-2" required />

      {/* არსებული სურათი რედაქტირებისას */}
      {form.imgUrl && !form.imgFile && (
        <div className="mb-2">
          <img src={form.imgUrl} alt="Current tour" className="w-32 h-32 object-cover mb-1" />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, imgFile: e.target.files[0] })}
        className="mb-2"
      />

      <textarea name="includes" placeholder="მარშრუტი" value={form.includes} onChange={handleChange} className="w-full border p-2" />

      {/* დღეების სექცია */}
      <div>
        <h3 className="font-semibold mb-2">დღეები</h3>
        {form.details.day.map((d, i) => (
          <div key={i} className="mb-2 border p-2 rounded">
            <input type="text" value={d.head} placeholder="დღის სათაური" onChange={(e) => handleDayChange(i, "head", e.target.value)} className="w-full border p-1 mb-1" required />
            <textarea value={d.paragraph} placeholder="დღის აღწერა" onChange={(e) => handleDayChange(i, "paragraph", e.target.value)} className="w-full border p-1" />
          </div>
        ))}
        <button type="button" onClick={addDay} className="bg-gray-300 px-2 py-1 rounded mt-1">ახალი დღე +</button>
      </div>

      {/* ფასში შედის */}
      <div>
        <h3 className="font-semibold mb-2">ფასში შედის</h3>
        {form.details.inPrice.map((item, i) => (
          <input key={i} type="text" value={item} onChange={(e) => handleArrayChange("inPrice", e.target.value, i)} className="w-full border p-2 mb-1" />
        ))}
        <button type="button" onClick={() => addArrayItem("inPrice")} className="bg-gray-300 px-2 py-1 rounded">დამატება +</button>
      </div>

      {/* აუცილებელია გადასახდელი */}
      <div>
        <h3 className="font-semibold mb-2">აუცილებელია გადასახდელი</h3>
        {form.details.mustPay.map((item, i) => (
          <input key={i} type="text" value={item} onChange={(e) => handleArrayChange("mustPay", e.target.value, i)} className="w-full border p-2 mb-1" />
        ))}
        <button type="button" onClick={() => addArrayItem("mustPay")} className="bg-gray-300 px-2 py-1 rounded">დამატება +</button>
      </div>

      {/* დამატებითი ტურები */}
      <div>
        <h3 className="font-semibold mb-2">დამატებითი ტურები</h3>
        {form.details.additionTours.map((item, i) => (
          <input key={i} type="text" value={item} onChange={(e) => handleArrayChange("additionTours", e.target.value, i)} className="w-full border p-2 mb-1" />
        ))}
        <button type="button" onClick={() => addArrayItem("additionTours")} className="bg-gray-300 px-2 py-1 rounded">დამატება +</button>
      </div>

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded mt-2">
        {tour?._id ? "შენახვა" : "დამატება"}
      </button>
    </form>
  );
}
