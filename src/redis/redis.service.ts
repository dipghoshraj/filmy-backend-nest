import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as Redis from 'ioredis';
import { env } from 'process';


@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {

    private client: Redis.Redis;

    onModuleInit() {
        this.client = new Redis.Redis({
            host: env.REDIS_HOST, // Redis server host
            port: 6379, // Redis server port
        })
    }

    onModuleDestroy() {
        this.client.quit(); //
    }

    async set(key: string, otp: string, ttlInSeconds: number): Promise<void> {
        await this.client.set(key, otp, 'EX', ttlInSeconds); // 'EX' sets an expiration time
    }
    
      // Example of getting OTP from Redis
    async get(key: string): Promise<string | null> {
    return this.client.get(key);
    }

    // Example of deleting OTP (optional)
    async delete(key: string): Promise<number> {
    return this.client.del(key);
    }
}