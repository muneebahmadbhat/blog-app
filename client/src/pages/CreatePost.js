import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await API.post("/api/posts/create", { title, content });
      navigate("/");
      alert("Post created");
    } catch (err) {
      alert("Error creating post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Post</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Enter post title..."
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-3 rounded"
          placeholder="Write your content..."
          rows="4"
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
