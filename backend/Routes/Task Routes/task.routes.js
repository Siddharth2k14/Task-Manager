import express from "express";
import { createTask } from "../../Controllers/Task Controller/createTask.controller";
import { getUserTasks } from "../../Controllers/Task Controller/getUserTasks.controller";
import { updateTask } from "../../Controllers/Task Controller/updateTask.controller";
import { deleteTask } from "../../Controllers/Task Controller/deleteTask.controller";


const router = express.Router();

/* Create Task */
router.post("/", createTask);

/* Get Tasks for a User */
router.get("/user/:userId", getUserTasks);

/* Update Task */
router.put("/:id", updateTask);

/* Delete Task */
router.delete("/:id", deleteTask);

export default router;