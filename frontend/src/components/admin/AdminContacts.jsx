import React, { useState, useEffect } from "react";
import API from "../../api/api";

export default function AdminContacts() {
  const [contact, setContact] = useState({ address: "", phone: "", email: "", mapEmbed: "" });
  const [loading, setLoading] = useState(true);

  const fetchContact = async () => {
    try {
      const res = await API.get("/contacts");
      if (res.data.length > 0) {
        setContact(res.data[0]); // ვიღებთ პირველ contact-ს
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);


  const handleSave = async () => {
    try {
      if (contact._id) {
        // Update
        await API.put(`/contacts/${contact._id}`, contact);
        alert("Contact updated!");
      } else {
        // Create
        const res = await API.post("/contacts", contact);
        setContact(res.data);
        alert("Contact created!");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving contact.");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="my-16">
      <h2 className="text-2xl font-bold mb-4">Contact Settings</h2>
      <div className="space-y-3">
        <input
          type="text"
          name="address"
          value={contact.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 w-full rounded"
        />
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full rounded"
        />

        <label className="text-red-600 mt-6 block">როცა რუკის ლინკს ჩააგდებ წაშალე width="..." heght="..."</label>
        <textarea
          id="textarea"
          name="mapEmbed"
          value={contact.mapEmbed}
          onChange={handleChange}
          placeholder="Google Maps Embed Code"
          className="border p-2 w-full rounded h-32"
        />
        <button
          onClick={handleSave}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
