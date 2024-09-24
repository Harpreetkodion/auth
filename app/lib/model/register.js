import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const RegisterUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Password comparison method
RegisterUserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Use an existing model or create a new one
const RegisterUser = mongoose.models.Register || mongoose.model('Register', RegisterUserSchema);

export default RegisterUser;