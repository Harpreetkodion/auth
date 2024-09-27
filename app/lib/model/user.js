import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, },
  bio: { type: String },
  location: { type: String },
  profileImage: { type: String },
  email: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
