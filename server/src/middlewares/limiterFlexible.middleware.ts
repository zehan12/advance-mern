import { NextFunction, Request, Response } from 'express';
import { IRateLimiterOptions, RateLimiterMemory } from 'rate-limiter-flexible';
import { MAX_REQUEST_WINDOW, MAX_WINDOW_REQUEST_COUNT } from '../constants/general';

const TOO_MANY_REQUESTS_MESSAGE = 'Too many requests';

const options: IRateLimiterOptions = {
  duration: MAX_REQUEST_WINDOW,
  points: MAX_WINDOW_REQUEST_COUNT,
};

const rateLimiter = new RateLimiterMemory(options);

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({ message: TOO_MANY_REQUESTS_MESSAGE });
    });
};
