import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import Blogs from "@/models/Blogs";
import connectMongo from "@/libs/mongoose";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req) {
  try {
    // Verificar la autenticación del usuario
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Conectar a la base de datos
    await connectMongo();

    // Obtener los datos del cuerpo de la solicitud
    const formData = await req.formData();
    const image = formData.get("image");
    const data = Object.fromEntries(formData);

    // Configurar Cloudinary
    cloudinary.config({
      cloud_name: "dipwgpxfs",
      api_key: "248767611487441",
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Subir la imagen a Cloudinary
    let imageUrl = "";
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            public_id: `blog_${Date.now()}`,
            fetch_format: "auto",
            quality: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else {
              imageUrl = result.secure_url;
              resolve(result);
            }
          }
        );
        uploadStream.end(buffer);
      });
    }

    // Crear un nuevo blog con los datos recibidos

    const newBlogs = new Blogs({
      ...data,
      image: imageUrl,
      userId: session.user.id,
    });

    // Guardar el blog en la base de datos
    await newBlogs.save();

    return NextResponse.json(newBlogs, { status: 201 });
  } catch (error) {
    console.error("Error al crear el blog:", error);
    return NextResponse.json(
      { error: "Error al crear el blog" },
      { status: 500 }
    );
  }
}
