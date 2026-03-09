import userModel from "../../Models/User Schema/user.model.js";

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};