import express from "express";
import Task from "../models/Task.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { calculateLevel, getRank } from "../utils/xpUtils.js";

const router = express.Router();


// 🟢 GET all tasks (AUTO RESET DAILY)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    const today = new Date().toDateString();

    for (let task of tasks) {
      if (
        task.lastCompletedDate &&
        new Date(task.lastCompletedDate).toDateString() !== today
      ) {
        task.completed = false;
        await task.save();
      }
    }

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔵 ADD task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;

    const newTask = new Task({
      title,
      userId: req.user.id
    });

    await newTask.save();

    res.json(newTask);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🟡 TOGGLE complete + XP + DATE LOGIC
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    const wasCompleted = task.completed;
    task.completed = !task.completed;

    console.log("Before XP:", user.xp);

    // 🎮 XP + DATE LOGIC
    if (!wasCompleted && task.completed) {
      user.xp += task.xpValue;
      task.lastCompletedDate = new Date(); // ✅ store date
    } else {
      user.xp -= task.xpValue;
      task.lastCompletedDate = null;
    }

    if (user.xp < 0) user.xp = 0;

    user.level = calculateLevel(user.xp);
    user.rank = getRank(user.level);

    await task.save();
    await user.save();

    console.log("After XP:", user.xp);

    res.json({ task, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔴 DELETE task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
