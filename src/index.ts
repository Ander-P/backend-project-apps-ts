import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.dev") });

import cors from "cors";
import express from "express";

//Routers
import aurhRouter from "./routers/auth";
import marvelRouter from "./routers/marvel";
import solicitudeRouter from "./routers/solicitude";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", aurhRouter);
app.use("/marvel", marvelRouter);
app.use("/solicitude", solicitudeRouter);

app.get("/", (_, res) => res.send("Welcome! Everything is working."));

app.listen(process.env.PORT, () => {
  console.log(`Server up and running @ ${process.env.PORT}`);
});
