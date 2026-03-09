import userModel from "../../Models/User Schema/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            console.error("Name and password are required");
            return res.status(400).json({ message: "Name and password are required" });
        }

        const existingUser = await userModel.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
    }
}