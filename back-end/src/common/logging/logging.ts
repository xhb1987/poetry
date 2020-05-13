import { createStream } from "rotating-file-stream";
import * as path from "path";
import morgan from "morgan";

const accessLogStream = createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

export default morgan("combined", { stream: accessLogStream });
