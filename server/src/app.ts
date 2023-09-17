import express, { Application, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import { fork } from "child_process";

import { get_breadcrumbs } from "./utils/general.utils";
import docs from "./docs/swagger";

// import dgram from "dgram";

const app: Application = express();

// add breadcrumbs
app.use((req, _, next) => {
  (req as any).breadcrumbs = get_breadcrumbs(req.originalUrl);
  next();
});

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(docs));


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
