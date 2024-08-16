require("dotenv").config();

import { connectToDB } from "./db/dbConnection";
import { rssParser } from "./lib/parser-rss";
import { rssScheduleTask } from "./lib/scheduler";
import { app } from "./app";

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
