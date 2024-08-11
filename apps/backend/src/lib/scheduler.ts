import cron from "node-cron";
import { rssParser } from "./parser-rss";

export const rssScheduleTask = cron.schedule("*/2 * * * *", () => {
  rssParser();
});
