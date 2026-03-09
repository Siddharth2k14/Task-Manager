import taskModel from "../../Models/Task Schema/task.model";

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ userId: req.params.userId });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};