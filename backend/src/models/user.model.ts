import mongoose from "mongoose"
const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [ 8, "Password must be at least 8 characters." ],
    },
    username: {
      type: String,
      required: false,
      unique: true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
