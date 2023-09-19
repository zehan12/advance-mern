import rateLimit from 'express-rate-limit';
import { MAX_WINDOW_REQUEST_COUNT, TRUE, WINDOW_PER_MS } from '../constants/general';

const limiter = rateLimit({
  windowMs: WINDOW_PER_MS,
  max: MAX_WINDOW_REQUEST_COUNT,
  skipSuccessfulRequests: TRUE
});

export default limiter;