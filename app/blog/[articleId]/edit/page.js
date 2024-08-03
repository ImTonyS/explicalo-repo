"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/libs/api";
import Link from "next/link";
import ButtonAccount from "@/components/ButtonAccount";

const EditBlogPage = ({ params }) => {
  const [blog, setBlog] = useState({ name: "", content: "", intro: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { articleId } = params;

  useEffect(() => {
    console.log("id", articleId);
    const fetchBlog = async () => {
      try {
        const response = await apiClient.get(`/blogs/${articleId}`);
        setBlog(response.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.put(`/blogs/${articleId}`, blog);
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
    <main className="min-h-screen md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center">
        <Link
          href="/dashboard"
          className="link !no-underline text-base-content/80 hover:text-base-content inline-flex items-center gap-1"
          title="Back to Blog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
            Regresar a posts 
          </Link>
          <ButtonAccount />
        </div>
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
            <label htmlFor="intro" className="block mb-2">Introduction</label>
            <textarea
              id="intro"
              name="intro"
              value={blog.intro}
              onChange={handleChange}
              className="w-full p-2 border rounded h-32"
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