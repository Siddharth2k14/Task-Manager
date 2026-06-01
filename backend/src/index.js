import express from "express";
import cors from "cors";
import userRoutes from "../Routes/User Routes/user.routes.js";
import taskRoutes from "../Routes/Task Routes/task.routes.js";
import connectUserDB from "../DB/User Database/user.db.js";
import connectTaskDB from "../DB/Task Database/task.db.js";

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://task-manager-z6fd-psi.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow access from this origin."));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectUserDB();
connectTaskDB();

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});