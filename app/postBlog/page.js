import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import BlogForm from "@/components/Explicalo/BlogForm";
import Link from "next/link";

export default async function PostBlog() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-start items-center">
         
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
         Regresar a dashboard 
       </Link>
        
       </div>
       <h1 className="text-2xl font-bold my-6 text-center text-gray-800">
          Crear nuevo blog
        </h1>
        <BlogForm />
      </div>
    </div>
  );
}
