import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  xpValue: {
    type: Number,
    default: 10
  },
  lastCompletedDate: {
  type: Date,
  default: null
}

}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
