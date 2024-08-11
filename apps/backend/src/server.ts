import express from "express";
import logger from "morgan";
import cors from "cors";
require("dotenv").config();

import { connectToDB } from "./db/dbConnection";
import { rssParser } from "./lib/parser-rss";
import { rssScheduleTask } from "./lib/scheduler";

// const errorHandler = require("./middlewares/errorsHandler");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.get("/", async (_, res) => {
  res.status(201).send({ message: "I am alive" });
});

const PORT = process.env.PORT || 3001;

connectToDB()
  .then(() => {
    rssParser();
    rssScheduleTask.start();

    app.listen(PORT, () => {
      console.log(`Server is running. Start listening port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(`Server isn't running. Error message: ${err.message}`);
    process.exit(1);
  });
