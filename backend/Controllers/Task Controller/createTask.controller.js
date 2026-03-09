import taskModel from "../../Models/Task Schema/task.model";

export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, userId } = req.body;

    const task = new taskModel({
      title,
      description,
      deadline,
      userId
    });

    await task.save();

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};