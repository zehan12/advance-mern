import express, { Application, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import hpp from "hpp";
import xssShield from "xss-shield";
import { fork } from "child_process";

import { get_breadcrumbs } from "./utils/general.utils";
import docs from "./docs/swagger";

// import dgram from "dgram";

const app: Application = express();

// Middlewares ==>

// Set Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Protect against HTTP Parameter Pollution attacks
app.use(hpp());

// Sanitize untrusted HTML  ( to prevent XSS )
const xss = xssShield.xssShield();
app.use(xss);

// Add breadcrumbs
app.use((req, _, next) => {
  (req as any).breadcrumbs = get_breadcrumbs(req.originalUrl);
  next();
});

// Add Swagger UI
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(docs));

app.get("/api/dir", (_, res) => {
  const childProcess = fork(__dirname + "/utils/dir.utils");
  childProcess.send({ dir: process.cwd() });
  childProcess.on("message", (message) => res.send(message));
});

app.get("/", (_: Request, res: Response) => {
  res.end("backend");
});

app.get("^/$|/index(.html)?", (_: Request, res: Response) => {
  res.send("<body><h1>Hello From Backend</h1></body>");
});

app.all("*", (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts("html")) {
    res.send("<body><h1>PAGE NOT FOUND</h1></body>");
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 NOT FOUND");
  }
});

export default app;
