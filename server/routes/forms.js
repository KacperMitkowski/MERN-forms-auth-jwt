import express from "express";
import { createForm, getForms, getForm, updateForm } from "../controllers/forms.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getForms);
router.get("/:id", getForm);
router.post("/", createForm);
router.patch("/:id", auth, updateForm);

export default router;