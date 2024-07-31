"use client";

import React, { useState } from "react";
import apiClient from "@/libs/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function BlogForm() {
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      // Enviar los datos del blog a tu API
      const response = await apiClient.post("/blogs", formData);
      toast.success("Blog creado correctamente");
      router.push("/dashboard");

      // Aquí puedes añadir lógica adicional, como redireccionar o mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error al crear el blog:", error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700"
        >
          Autor:
        </label>
        <input
          type="text"
          id="author"
          name="author"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="intro"
          className="block text-sm font-medium text-gray-700"
        >
          Introducción:
        </label>
        <textarea
          id="intro"
          name="intro"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows="3"
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Imagen del blog:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primaryDark file:text-white
                hover:file:bg-primary
                file:cursor-pointer"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Contenido:
        </label>
        <textarea
          id="content"
          name="content"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          rows="6"
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Categoría:
        </label>
        <select
          id="category"
          name="category"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        >
          <option value="">Selecciona una categoría</option>
          <option value="tecnologia">Tecnología</option>
          <option value="viajes">Viajes</option>
          <option value="cocina">Cocina</option>
          <option value="deportes">Deportes</option>
          <option value="moda">Moda</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primaryDark hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Publicar blog
      </button>
    </form>
  );
}
