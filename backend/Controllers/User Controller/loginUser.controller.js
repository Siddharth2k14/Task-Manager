import userModel from "../../Models/User Schema/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await userModel.findOne({ name });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({
        userId: user._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      userId: user._id,
      token: token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};