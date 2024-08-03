import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Blogs from "@/models/Blogs";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongo();

    const blogId = params.id;
    console.log("blogId", blogId);
    const blog = await Blogs.findById(new ObjectId(blogId));
    

    if (!blog) {
      return NextResponse.json({ error: "Blog no encontrado" }, { status: 404 });
    }

    if (blog.userId.toString() !== session.user.id) {
      return NextResponse.json({ error: "No autorizado para cambiar el estado de este blog" }, { status: 403 });
    }
    await Blogs.findByIdAndUpdate(blogId, { status: false });

    return NextResponse.json({ message: "Estado del blog cambiado exitosamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al cambiar el estado del blog:", error);
    return NextResponse.json({ error: "Error al cambiar el estado del blog" }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await connectMongo();

    const blogId = params.id;
    if (!ObjectId.isValid(blogId)) {
      return NextResponse.json({ error: "ID de blog inválido" }, { status: 400 });
    }

    const { name, content } = await req.json();

    const blog = await Blogs.findById(blogId);

    if (!blog) {
      return NextResponse.json({ error: "Blog no encontrado" }, { status: 404 });
    }

    if (blog.userId.toString() !== session.user.id) {
      return NextResponse.json({ error: "No autorizado para editar este blog" }, { status: 403 });
    }

    blog.name = name;
    blog.content = content;
    await blog.save();

    return NextResponse.json({ message: "Blog actualizado exitosamente", blog }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    await connectMongo();

    const blogId = params.id;
    if (!ObjectId.isValid(blogId)) {
      return NextResponse.json({ error: "ID de blog inválido" }, { status: 400 });
    }

    const blog = await Blogs.findById(blogId);

    if (!blog) {
      return NextResponse.json({ error: "Blog no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
