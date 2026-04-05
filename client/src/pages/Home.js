import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🗑️ DELETE POST
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/posts/${id}`);
      fetchPosts(); // refresh without reload
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-center">All Posts</h1>

      {/* CREATE BUTTON */}
      <div className="text-center mb-6">
        <Link
          to="/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </Link>
      </div>

      {/* POSTS */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

              <p className="text-gray-600 mb-3">{post.content}</p>

              <p className="text-sm text-gray-400 mb-3">
                By {post.author?.name}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">
                {/* EDIT */}
                <Link
                  to={`/edit/${post._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
