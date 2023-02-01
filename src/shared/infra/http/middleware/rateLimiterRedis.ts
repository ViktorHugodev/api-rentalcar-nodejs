import { Request, Response, NextFunction } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import * as redis from 'redis'

import { AppErrors } from '@errors/AppError'

const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    sessionTimeout: 20,
  },
})

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiterMiddleware',
  points: 5, // 10 requests
  duration: 5, // per 1 second by IP
})

const rateLimiterMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await redisClient.connect()
    await rateLimiter.consume(request.ip)
    return next()
  } catch (err) {
    console.log('🚀 ~ file: rateLimiterRedis.ts:32 ~ err', err)
    throw new AppErrors('Too many requests', 429)
  } finally {
    await redisClient.disconnect()
  }
}

export { rateLimiterMiddleware }
