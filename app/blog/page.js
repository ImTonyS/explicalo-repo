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
  const blogs = await Blogs.find({});

  return (
    <>
      <section className="text-center max-w-xl mx-auto mt-12 mb-12 md:mb-12">
        <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
          Descubre lo explicado.
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Learn how to ship your startup in days, not weeks. And get the latest
          updates about the boilerplate
        </p>
      </section>

      <section className="grid lg:grid-cols-2 mb-12 md:mb-12 gap-8">
        {blogs.map((blog) => (
          <div key={blog._id} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{blog.name}</h2>
              <p>{blog.intro}</p>
              <p>Creado por: {blog.author}</p>
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
