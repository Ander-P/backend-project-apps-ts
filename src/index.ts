import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.dev') });

import cors from 'cors';
import express from 'express';

//Routers
import marvelRouter from "./routers/marvel";
import aurhRouter from "./routers/auth";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/marvel", marvelRouter)
app.use("/api/v1/auth", aurhRouter)


app.get('/', (_, res) => res.send('Welcome! Everything is working.'));

app.listen(process.env.PORT, () => {
  console.log(`Server up and running @ ${process.env.PORT}`);
});