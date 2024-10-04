import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name: {type: String, required: true},
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
}, {
    timestamps: true,
});

const UserSchema = mongoose.model('User', User)

export default UserSchema;