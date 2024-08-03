"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/libs/api";

const EditBlogPage = ({ params }) => {
  const [blog, setBlog] = useState({ name: "", content: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    console.log("id", id);
    const fetchBlog = async () => {
      try {
        const response = await apiClient.get(`/blogs/${id}`);
        setBlog(response.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.put(`/blogs/${id}`, blog);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating blog:", error);
      setError("Failed to update blog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog(prevBlog => ({ ...prevBlog, [name]: value }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Title</label>
            <input
              type="text"
              id="name"
              name="name"
              value={blog.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block mb-2">Content</label>
            <textarea
              id="content"
              name="content"
              value={blog.content}
              onChange={handleChange}
              className="w-full p-2 border rounded h-64"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditBlogPage;