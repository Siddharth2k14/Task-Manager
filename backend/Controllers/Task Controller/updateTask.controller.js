import taskModel from "../../Models/Task Schema/task.model";

export const updateTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};