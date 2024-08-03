"use client";

import { useState, useEffect } from "react";
import ButtonAccount from "@/components/ButtonAccount";
import { useSession } from "next-auth/react"
import apiClient from "@/libs/api";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();


  useEffect(() => {
    const fetchBlogs = async () => {
      if (session?.user?.id) {
        try {
          const { blogs } = await apiClient.get(`/blogs/userBlogs`);
          if (blogs) {
            setBlogs(blogs);
          } else {
            console.error("Failed to fetch blogs");
          }
        } catch (error) {
          console.error("Error fetching blogs:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBlogs();
  }, [session]);

  const handleDelete = async (blogId) => {
    try {
      await apiClient.delete(`/blogs/${blogId}`);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));

      window.location.reload();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = async (blogId) => {
    router.push(`/blog/${blogId}/edit`);
  };


  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold">Dashboard</h1>
        
        {/* Fetch and display user's blogs */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Mis blogs</h2>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          ) : blogs.length > 0 ? (
            <ul className="space-y-4">
              {blogs.map((blog) => (
                blog.status && (
                  <li key={blog._id} className="border p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{blog.name}</h3>
                      <p className="text-gray-600">{blog.author}</p>
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => handleEdit(blog.id)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-6000">Editar</button>
                      <button onClick={() => handleDelete(blog.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-6000">Borrar</button>
                    </div>
                  </li>
                )
              ))}
            </ul>
          ) : (
            <p>You haven't created any blogs yet.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
