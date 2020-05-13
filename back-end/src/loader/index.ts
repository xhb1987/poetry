import ExpressLoader from "./express-loader";
import LogLoader from "./logger-loader";
import MongoLoader from "./mongo-loader";

import { Application } from "express";
import bodyParser from "body-parser";

export default async ({ expressApp }: { expressApp: Application }) => {
  console.log("loading!!!!");
  require("dotenv").config();

  if (process.env.SECRET === null || process.env.SECRET === undefined) {
    throw Error("cannot found env config file");
  }

  expressApp.use(bodyParser.json());
  await MongoLoader();
  await LogLoader({ app: expressApp });
  await ExpressLoader({ app: expressApp });
};
