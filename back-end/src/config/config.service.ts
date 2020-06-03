import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as dotenv from "dotenv";

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    this.envConfig = dotenv.parse(fs.readFileSync(`.env`));
  }

  get databaseHost(): string {
    return this.envConfig.DATABASE_HOST;
  }

  get databaseUsername(): string {
    return this.envConfig.DATABASE_USERNAME;
  }
}
