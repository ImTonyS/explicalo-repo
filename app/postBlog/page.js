import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import BlogForm from "@/components/Explicalo/BlogForm";

export default async function PostBlog() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Crear nuevo blog
        </h1>
        <BlogForm />
      </div>
    </div>
  );
}
