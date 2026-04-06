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

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/posts/${id}`);
      fetchPosts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">
          📝 All Posts
        </h1>

        <Link
          to="/create"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition duration-200 font-semibold"
        >
          + Create Post
        </Link>
      </div>

      {/* EMPTY STATE */}
      {posts.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg">No posts yet 😕</p>
          <p className="text-gray-400">Start by creating your first post!</p>
        </div>
      ) : (
        /* POSTS GRID */
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between"
            >
              {/* CONTENT AREA */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content}
                </p>

                <p className="text-sm text-gray-400 mb-4">
                  ✍️ {post.author?.name || "Unknown"}
                </p>
              </div>

              {/* ACTIONS (ALWAYS AT BOTTOM) */}
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/edit/${post._id}`}
                  className="bg-yellow-400 text-white px-4 py-1.5 rounded-lg hover:bg-yellow-500 transition duration-200 text-sm font-medium"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition duration-200 text-sm font-medium"
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
