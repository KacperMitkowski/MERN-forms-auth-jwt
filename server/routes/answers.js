import express from "express";
import auth from "../middlewares/auth.js";
import { addAnswer } from "../controllers/answers.js";

const router = express.Router();

router.post("/:formId", auth, addAnswer);

export default router;