import express from "express"
import cors from "cors";
import userRoutes from "../Routes/User Routes/user.routes.js";
import taskRoutes from "../Routes/Task Routes/task.routes.js";
import { connectUserDB } from "../DB/User Database/user.db.js";
import { connectTaskDB } from "../DB/Task Database/task.db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
connectUserDB()
connectTaskDB()
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})