import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Blogs from "@/models/Blogs";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  
  await connectMongo();

  const blogs = await Blogs.find({ userId: user.id });
  
  return NextResponse.json({ blogs: blogs });
}