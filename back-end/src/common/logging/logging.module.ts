import { Module } from "@nestjs/common";
import { Logger } from "./logging";

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
