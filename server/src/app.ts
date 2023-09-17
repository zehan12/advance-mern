import express, { Application, Request, Response } from "express";
import { get_breadcrumbs } from "./utils/general.utils";
// import dgram from "dgram";

const app: Application = express();

// add breadcrumbs
app.use((req, _, next) => {
  (req as any).breadcrumbs = get_breadcrumbs(req.originalUrl);
  next();
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
