import { NextApiResponse } from 'next';

interface RateLimitConfig {
  interval: number;
  uniqueTokenPerInterval: number;
}

interface RateLimitStore {
  [key: string]: {
    tokens: number;
    lastReset: number;
  };
}

const store: RateLimitStore = {};

export const rateLimit = (config: RateLimitConfig) => {
  return {
    check: (res: NextApiResponse, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const now = Date.now();
        const key = `${token}:${limit}`;

        if (!store[key]) {
          store[key] = {
            tokens: limit,
            lastReset: now,
          };
        }

        const rateLimitInfo = store[key];

        // Reset tokens if interval has passed
        if (now - rateLimitInfo.lastReset >= config.interval) {
          rateLimitInfo.tokens = limit;
          rateLimitInfo.lastReset = now;
        }

        if (rateLimitInfo.tokens <= 0) {
          res.setHeader('X-RateLimit-Limit', limit);
          res.setHeader('X-RateLimit-Remaining', 0);
          res.setHeader('X-RateLimit-Reset', rateLimitInfo.lastReset + config.interval);
          reject(new Error('Rate limit exceeded'));
        }

        rateLimitInfo.tokens -= 1;
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', rateLimitInfo.tokens);
        res.setHeader('X-RateLimit-Reset', rateLimitInfo.lastReset + config.interval);

        resolve();
      }),
  };
};
