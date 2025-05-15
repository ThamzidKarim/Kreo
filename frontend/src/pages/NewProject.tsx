/**
 * Author: Thamzid Karim
 * Date: 15/5/2025
 * Page to create a new project by name and redirect to editor.
 */

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function NewProject() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Handle form submission and redirect
  const handleSubmit = async (e: React.FormEvent) => {
    const res = await axios.post("/api/projects", { name });
    navigate(`/story/${res.data.id}`); // Go to story page
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 border rounded shadow-lg w-[400px]">
        <label className="text-xl font-semibold">Project Name</label>
        <input
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}

export default NewProject;
