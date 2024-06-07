import express from "express";
import { create } from "../controllers/solicitude";

const router = express.Router();

router.post("/", create);

export default router;
