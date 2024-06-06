import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import marvelRouter from "./routers/marvel";

dotenv.config({ path: path.join(process.cwd(), ".env.dev") });

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers
app.use("/marvel", marvelRouter);
app.get("/", (_, res) => res.send("Welcome! Everything is working."));

app.listen(port, () => {
  console.log(`Server up and running @ ${port}`);
});
