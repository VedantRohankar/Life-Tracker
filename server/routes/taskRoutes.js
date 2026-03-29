import express from "express";
import Task from "../models/Task.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { calculateLevel, getRank } from "../utils/xpUtils.js";

const router = express.Router();




router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    const today = new Date().toDateString();

    for (let task of tasks) {
      // 🔥 RESET LOGIC (FINAL FIX)
      if (
        task.completed &&
        task.lastCompletedDate &&
        new Date(task.lastCompletedDate).toDateString() !== today
      ) {
        task.completed = false;
        task.lastCompletedDate = null; // IMPORTANT
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

    const today = new Date().toDateString();
    const wasCompleted = task.completed;

    // 🔄 TOGGLE
    task.completed = !task.completed;

    // ✅ COMPLETE TASK
    if (!wasCompleted && task.completed) {
      user.xp += task.xpValue;

      // 🔥 SET TODAY DATE
      task.lastCompletedDate = new Date();

      // 🔥 ADD TO STREAK
      const alreadyDoneToday = task.completedDates.some(
        (date) => new Date(date).toDateString() === today
      );

      if (!alreadyDoneToday) {
        task.completedDates.push(new Date());
      }

    } 
    // ❌ UNCHECK TASK
    else {
      user.xp -= task.xpValue;
      task.lastCompletedDate = null;
    }

    if (user.xp < 0) user.xp = 0;

    // 📊 XP HISTORY (GRAPH FIX)
    const existingEntry = user.xpHistory.find(
      (entry) =>
        new Date(entry.date).toDateString() === today
    );

    if (existingEntry) {
      existingEntry.xp = user.xp;
    } else {
      user.xpHistory.push({
        date: new Date(),
        xp: user.xp
      });
    }

    // 📈 LEVEL + RANK
    user.level = calculateLevel(user.xp);
    user.rank = getRank(user.level);

    await task.save();
    await user.save();

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

// // 🟢 GET all tasks (AUTO RESET DAILY)--FOR RESETTING 
// router.get("/reset-all", async (req, res) => {
//   await Task.updateMany({}, {
//     completed: false,
//     lastCompletedDate: null
//   });

//   res.send("All tasks reset");
// });

// 📊 STREAK
router.get("/streak", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    let allDates = [];

    tasks.forEach(task => {
      allDates = [...allDates, ...task.completedDates];
    });

    const uniqueDates = [
      ...new Set(allDates.map(d => new Date(d).toDateString()))
    ];

    uniqueDates.sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    let currentDate = new Date();

    for (let date of uniqueDates) {
      if (
        new Date(date).toDateString() ===
        currentDate.toDateString()
      ) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    res.json({ streak, dates: uniqueDates });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

