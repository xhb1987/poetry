import {
  createLogger,
  transports,
  format,
  Logger as WinstonLogger,
} from "winston";
import { LoggerService } from "@nestjs/common";

export class Logger implements LoggerService {
  private logger: WinstonLogger;
  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf((info) => `${info.level} -> ${info.message}`)
      ),

      transports: [
        new transports.File({
          level: "info",
          filename: "./log/logs.log",
          format: format.combine(
            format.colorize({ level: true }),
            format.timestamp(),
            format.align()
          ),
        }),

        new transports.Console({
          format: format.colorize({ level: true }),
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace: string) {
    this.logger.error(message);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
}
