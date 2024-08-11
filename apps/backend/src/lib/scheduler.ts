import cron from "node-cron";
import { rssParser } from "./parser-rss";

export const rssScheduleTask = cron.schedule("*/5 * * * *", () => {
  rssParser();
});
// console.log("STARTED");

// setInterval(() => {
//   rssParser();
// }, 60000 * 10);
