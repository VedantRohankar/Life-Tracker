import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // 🎮 Gamification fields
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  rank: {
    type: String,
    default: "Beginner"
  },
  avatar: {
  type: String,
  default: ""
},
  xpHistory: {
  type: [
    {
      date: String,
      xp: Number
    }
  ],
  default: []
}
}, { timestamps: true });

export default mongoose.model("User", userSchema);
