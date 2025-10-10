import React, { useEffect, useState } from "react";
import API from "../../api/api";
import RequireCard from "../require/RequireCard";
import RequireForm from "../require/RequireForm";

export default function RequireAdminSection() {
  const [requires, setRequires] = useState([]);
  const [editingRequire, setEditingRequire] = useState(null);

  const fetchRequires = async () => {
    try {
      const res = await API.get("/requires");
      setRequires(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequires();
  }, []);

  const handleSave = (saved) => {
    if (editingRequire) {
      setRequires((prev) =>
        prev.map((r) => (r._id === saved._id ? saved : r))
      );
    } else {
      setRequires((prev) => [saved, ...prev]);
    }
    setEditingRequire(null);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/requires/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRequires((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Require Section</h2>
      <RequireForm editingRequire={editingRequire} onSave={handleSave} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requires.map((r) => (
          <div key={r._id}>
            <RequireCard requireItem={r} />
            <div className="flex gap-2 mt-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => setEditingRequire(r)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(r._id)}
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
