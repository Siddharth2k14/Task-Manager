import express from "express"
import { registerUser } from "../../Controllers/User Controller/registerUser.controller.js";
import { loginUser } from "../../Controllers/User Controller/loginUser.controller.js";
import { getUser } from "../../Controllers/User Controller/getUser.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUser)

export default router;