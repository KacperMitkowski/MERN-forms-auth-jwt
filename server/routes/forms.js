import express from "express";
const router = express.Router();

import { createForm } from "../controllers/forms.js";

router.post("/", createForm);

export default router;