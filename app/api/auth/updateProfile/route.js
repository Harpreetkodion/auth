import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/lib/model/user";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  const { id, name, bio, location, profileImage, email } = await req.json();
  const token = await getToken({ req });
  console.log('token',token)
  if (!token) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }
  
  try {
    await connectToDatabase();
    const userId = new mongoose.Types.ObjectId(id);
    const user = await User.findOne({ userId });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    user.name = name;
    user.bio = bio;
    user.location = location;
    user.profileImage = profileImage;

    const updatedUser = await user.save();
    return new Response(
      JSON.stringify({ message: "User updated successfully!", user: updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}
