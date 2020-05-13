import { Application } from "express";
import logging from "../common/logging/logging";

export default async ({ app }: { app: Application }) => {
  app.use(logging);
  return app;
};
