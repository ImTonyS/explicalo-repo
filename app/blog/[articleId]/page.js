import Link from "next/link";
import Script from "next/script";
import BadgeCategory from "../_assets/components/BadgeCategory";
import Avatar from "../_assets/components/Avatar";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import connectMongo from "@/libs/mongoose";
import Blogs from "@/models/Blogs";

export default async function Article({ params }) {
  await connectMongo();
  const blog = await Blogs.findOne({ id: params.blogId  });

  if (!blog) {
    return <div>Blog no encontrado</div>;
  }

  return (
    <>
      {/* SCHEMA JSON-LD MARKUP FOR GOOGLE */}
      <Script
        type="application/ld+json"
        id={`json-ld-article-${blog.id}`}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://${config.domainName}/blog/${blog.id}`,
            },
            name: blog.name,
            headline: blog.name,
            description: blog.intro,
            // You might want to add an image field to your Blog model
            // image: `https://${config.domainName}${blog.image}`,
            datePublished: blog.createdAt,
            dateModified: blog.updatedAt,
            author: {
              "@type": "Person",
              name: blog.author,
            },
          }),
        }}
      />

      {/* GO BACK LINK */}
      <div>
        <Link
          href="/blog"
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
      </div>

      <article>
        {/* HEADER WITH TITLE AND DATE */}
        <section className="my-12 md:my-20 max-w-[800px]">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-base-content/80" itemProp="datePublished">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 md:mb-8">
            {blog.name}
          </h1>

          <p className="text-base-content/80 md:text-lg max-w-[700px]">
            {blog.intro}
          </p>

          {blog.image && (
            <img
              src={blog.image}
              alt={blog.name}
              className="w-full max-w-[500px] max-h-[300px]  rounded-lg mt-6"
            />
          )}
        </section>

        <div className="flex flex-col md:flex-row">
          {/* SIDEBAR WITH AUTHOR AND 3 RELATED ARTICLES */}
          <section className="max-md:pb-4 md:pl-12 max-md:border-b md:border-l md:order-last md:w-72 shrink-0 border-base-content/10">
            <p className="text-base-content/80 text-sm mb-2 md:mb-3">
              Creado por: 
            </p>
            <div className="flex items-center gap-2">
              <span className="font-medium">{blog.author}</span>
            </div>

            
          </section>

          {/* ARTICLE CONTENT */}
          <section className="w-full max-md:pt-4 md:pr-20 space-y-12 md:space-y-20">
            {blog.content}
          </section>
        </div>
      </article>
    </>
  );
}
