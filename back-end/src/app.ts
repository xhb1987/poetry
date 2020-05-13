import "reflect-metadata";
import express, { Application } from "express";
import loader from "./loader";

const startServer = async () => {
  const app: Application = express();
  await loader({ expressApp: app });
  return app.listen(3000, () => console.log("express start at 3000"));
};

startServer();
