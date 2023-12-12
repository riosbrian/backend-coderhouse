import morgan from "morgan";
import fs from "fs";
import path from "path";
import __dirname from "./dirname.js";
import args from "./args.js";

const logsDirectory = `${__dirname}/../logs`;

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

export const logger = (app) => {
  const mode = args.mode || "dev"; // Modo por defecto es 'dev' si no se proporciona
  const logFileName = mode === "prod" ? "access-prod.log" : "access-dev.log";
  const accessLogStream = fs.createWriteStream(
    path.join(logsDirectory, logFileName),
    { flags: "a" }
  );

  app.use(morgan("combined", { stream: accessLogStream }));
};
