import express from "express";
import { getCharacters, getComics } from "../helper";

const router = express.Router();

router.get("/characters", async (_, res) => {
  const response = await getCharacters();
  res.status(200).json(response.data.results);
});

router.get("/comics", async (_, res) => {
  const response = await getComics();
  res.status(200).json(response.data.results);
});

export default router;
