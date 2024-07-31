import Link from "next/link";
import ButtonSignin from "@/components/ButtonSignin";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <main className=" bg-gradient-to-br from-black to-primary h-screen ">
        <header className=" pt-8 px-8 flex justify-between items-center  max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-white">Explícalo.</h1>
          <ButtonSignin text="Inicia Sesión" />
        </header>

        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 pt-40 ">
          <h1 className="text-sm md:text-lg font-medium text-white">
            ¿Alguna vez deseaste que te hubieran explicado de otra manera?
          </h1>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-extrabold text-white">
            Explícalo.
          </h1>
          <h1 className="text-sm md:text-lg font-medium text-white">
            Seguro alguien está pasando por lo mismo.
          </h1>

          <div className="flex gap-x-4">
            <Link
              className="px-5 py-3 bg-primaryDark rounded-md flex items-center gap-1 text-white text-sm hover:bg-primaryLight hover:text-black transition-all duration-300"
              href="/postBlog"
            >
              Publica{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              className="px-5 py-2  rounded-md flex items-center gap-2 text-white text-sm hover:bg-primaryLight hover:text-black transition-all duration-300"
              href="/blog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
              Descubre{" "}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
