import { categories, articles } from "./_assets/content";
import CardArticle from "./_assets/components/CardArticle";
import CardCategory from "./_assets/components/CardCategory";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import connectMongo from "@/libs/mongoose";
import Blogs from "@/models/Blogs";
import Link from "next/link";

export const metadata = getSEOTags({
  title: `${config.appName} Blog | Stripe Chargeback Protection`,
  description:
    "Learn how to prevent chargebacks, how to accept payments online, and keep your Stripe account in good standing",
  canonicalUrlRelative: "/blog",
});

export default async function BlogPage() {
  
  await connectMongo()
  const blogs = await Blogs.find({ status: true });

  return (
    <>
      <section className="text-center max-w-xl mx-auto mt-12 mb-2 md:mb-2">
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
        <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight my-6">
          Descubre lo explicado.
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Aqui puedes encontrar todos los articulos de explicalo. Encuentra el que necesites y si no encuentras el que buscas, puedes crearlo.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 my-12 md:my-12 gap-8 max-w-2xl mx-auto">
        {blogs.map((blog) => (
          <div key={blog._id} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{blog.name}</h2>

              <p className="text-sm font-medium opacity-80">Creado por: {blog.author}</p>
              <div className="card-actions justify-end">
                <Link href={`/blog/${blog.id}`} className="bg-primary px-4 py-2 rounded-md text-white font-semibold hover:bg-primary/80 transition-all duration-300">Leer mas</Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      
    </>
  );
}
