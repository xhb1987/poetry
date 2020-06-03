import { Injectable } from "@nestjs/common";

// @Injectable()
// export class ConfigService {}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: process.env.SECRET,
});
