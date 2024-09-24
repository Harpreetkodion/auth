import User from "@/app/lib/model/user";
import { connectToDatabase } from '@/app/lib/db';
import RegisterUser from '@/app/lib/model/register';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    await connectToDatabase();

    const existingUser = await RegisterUser.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already exists' }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await RegisterUser.create({
      email,
      password: hashedPassword,
    });

    await User.create({ email, userId: newUser._id }); 
    return new Response(JSON.stringify({ message: 'User created successfully', user: newUser }), { status: 201 });
  } catch (error) {
    console.error('Error during user registration:', error); 
    return new Response(JSON.stringify({ message: 'Something went wrong', error: error.message }), { status: 500 });
  }
}
