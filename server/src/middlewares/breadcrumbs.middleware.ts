import { get_breadcrumbs } from "../utils/general.utils";
import { Request, Response, NextFunction } from "express";

export const breadcrumbs = (req: Request, _: Response, next: NextFunction) => {
  (req as any).breadcrumbs = get_breadcrumbs(req.originalUrl);
  next();
};
