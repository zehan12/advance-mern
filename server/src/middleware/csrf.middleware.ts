import csrf from "csrf";
import { Response, Request, NextFunction } from "express";

const tokens = new csrf();

const csurf = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = tokens.secretSync(); // Generate a secret for the session
  const token = tokens.create(secret); // Create a CSRF token
  // Attach the token to a cookie
  res.cookie("csrf-token", token, { httpOnly: true });
  // Make the token available in templates (if using a view engine)
  res.locals.csrfToken = token;
  next();
};

export default csurf;
