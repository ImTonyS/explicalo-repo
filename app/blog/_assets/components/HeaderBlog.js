"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";
import config from "@/config";
import { categories } from "../content";
import ButtonSignin from "@/components/ButtonSignin";

const links = [
  {
    href: "/blog/",
    label: "All Posts",
  },
];

const cta = (
  <ButtonSignin text="Prevent disputes" extraStyle="btn-primary md:btn-sm" />
);

const ButtonPopoverCategories = () => {
  return (
    <Popover className="relative z-30">
      {({ open }) => (
        <>
          <Popover.Button
            className="link no-underline flex flex-nowrap items-center gap-1 text-base-content/80 hover:text-base-content active:text-base-content focus:text-base-content duration-100"
            title="Open Blog categories"
          >
            Categories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 duration-200 ${
                open ? "transform rotate-180 " : ""
              }`}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute left-0 z-30 mt-3 w-screen max-w-full sm:max-w-sm transform">
              {({ close }) => (
                <div className="overflow-hidden rounded-box shadow-lg ring-1 ring-base-content ring-opacity-5">
                  <div className="relative grid gap-2 bg-base-100 p-2 overflow-hidden">
                    {categories.map((category) => (
                      <div key={category.slug} onClick={() => close()}>
                        <Link
                          className="block text-left p-3 -m-1 cursor-pointer hover:bg-base-200 rounded-box duration-200"
                          href={`/blog/category/${category.slug}`}
                        >
                          <div className="">
                            <p className="font-medium mb-0.5">
                              {category?.titleShort || category.title}
                            </p>
                            <p className="text-sm opacity-80">
                              {category?.descriptionShort ||
                                category.description}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const ButtonAccordionCategories = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
        type="button"
        className="link no-underline flex justify-between items-center w-full "
      >
        Categories
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 duration-200 ${
            isOpen ? "transform rotate-180 " : ""
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/blog/category/${category.slug}`}
                className="text-base-content/80 hover:text-base-content duration-100 link link-hover"
              >
                {category?.titleShort || category.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

// This is the header that appears on all pages in the /blog folder.
// By default it shows the logo, the links, and the CTA.
// In the links, there's a popover with the categories.
const HeaderBlog = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // setIsOpen(false) when the route changes (i.e: when the user clicks on a link on mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  return (
    <header className="bg-primaryDark">
      <nav className="max-w-7xl flex items-center justify-between px-8 py-3 mx-auto">
        {/* Your logo/name on large screens */}
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-2 shrink-0 "
            href="/"
            title={`${config.appName} hompage`}
          >
            <span className="font-extrabold text-lg text-white">
              Explícalo.
            </span>
          </Link>
        </div>

        {/* Your links on large screens */}
        

        {/* CTA on large screens */}
      </nav>
    </header>
  );
};

export default HeaderBlog;
