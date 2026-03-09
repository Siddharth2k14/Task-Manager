import taskModel from "../../Models/Task Schema/task.model.js";

export const deleteTask = async (req, res) => {
  try {
    await taskModel.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};