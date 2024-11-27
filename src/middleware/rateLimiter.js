const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: process.env.RATE_LIMIT_REQUESTS || 100, // Maximum requests
  duration: process.env.RATE_LIMIT_WINDOW || 60, // Per minute
});

module.exports = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({ message: 'Too many requests. Please try again later.' });
    });
};
