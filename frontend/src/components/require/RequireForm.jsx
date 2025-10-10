import React, { useEffect, useState } from "react";
import API from "../../api/api";

export default function RequireForm({ editingRequire, onSave }) {
  const [head, setHead] = useState("");
  const [answer, setAnswer] = useState([""]);
  const [fullAnswer, setFullAnswer] = useState([""]);

  useEffect(() => {
    if (editingRequire) {
      setHead(editingRequire.head || "");
      setAnswer(editingRequire.answer || [""]);
      setFullAnswer(editingRequire.fullAnswer || [""]);
    }
  }, [editingRequire]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { head, answer, fullAnswer };

    try {
      let res;
      if (editingRequire) {
        res = await API.put(`/requires/${editingRequire._id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        res = await API.post("/requires", payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      onSave(res.data);
      setHead("");
      setAnswer([""]);
      setFullAnswer([""]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateArrayValue = (arr, setArr, i, val) => {
    const copy = [...arr];
    copy[i] = val;
    setArr(copy);
  };

  const addField = (arr, setArr) => setArr([...arr, ""]);
  const removeField = (arr, setArr, i) =>
    setArr(arr.filter((_, idx) => idx !== i));

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded shadow">
      <div className="mb-3">
        <label className="block font-medium">Head (optional)</label>
        <input
          type="text"
          value={head}
          onChange={(e) => setHead(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Answer fields */}
      <div className="mb-3">
        <label className="block font-medium">Question</label>
        {answer.map((a, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={a}
              onChange={(e) => updateArrayValue(answer, setAnswer, i, e.target.value)}
              className="border rounded p-2 w-full"
            />
            <button type="button" onClick={() => removeField(answer, setAnswer, i)}>❌</button>
          </div>
        ))}
        <button type="button" onClick={() => addField(answer, setAnswer)} className="text-blue-600">
          + Add Question
        </button>
      </div>

      {/* FullAnswer fields */}
      <div className="mb-3">
        <label className="block font-medium">Answers</label>
        {fullAnswer.map((f, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={f}
              onChange={(e) => updateArrayValue(fullAnswer, setFullAnswer, i, e.target.value)}
              className="border rounded p-2 w-full"
            />
            <button type="button" onClick={() => removeField(fullAnswer, setFullAnswer, i)}>❌</button>
          </div>
        ))}
        <button type="button" onClick={() => addField(fullAnswer, setFullAnswer)} className="text-blue-600">
          + Add Answer
        </button>
      </div>

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        {editingRequire ? "Update" : "Create"}
      </button>
    </form>
  );
}
