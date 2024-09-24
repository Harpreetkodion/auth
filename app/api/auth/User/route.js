import { connectToDatabase } from '@/app/lib/db';
import User from '@/app/lib/model/user';
import mongoose from 'mongoose';

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); 

  try {
    await connectToDatabase(); 

    const userId = new mongoose.Types.ObjectId(id);
    const user = await User.findOne({ userId });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'User not found.' }),
        { status: 404 }
      );
    }

    const {  ...userData } = user._doc;

    return new Response(
      JSON.stringify({ message: 'User found', user: userData }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(
      JSON.stringify({ message: 'Server error', error: error.message }),
      { status: 500 }
    );
  }
}
