import express from "express";
import { getCharacters } from "../helper";

const router = express.Router();

router.get("/characters", async (_, res) => {
  const response = await getCharacters();
  res.status(200).json(response.data.results);
});

export default router;
